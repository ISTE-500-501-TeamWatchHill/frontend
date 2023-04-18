import React, {useState, useEffect} from 'react'
// import globalStyles from '../../pages/pages.module.css';
import { useNavigate } from "react-router-dom";
import styles from './addpopup.module.css';
import Cookies from 'universal-cookie';
import Button from '../button/button';
import { CFormSwitch } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'

export default function AddPopup(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const nothing = {_id: 1, approvalStatus: true, description: "None", logo: "", players: [], universityID: 1};

    //Setup for hook for teams
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [awayTeamSelected, changeAwayTeamSelected] = useState(nothing);
    const [homeTeamSelected, changeHomeTeamSelected] = useState(nothing);
    const [univSelected, changeUnivSelected]= useState("None");
    const [universities, changeUniversities] = useState([{_id: 'None', universityID: 2760, moderatorIDs:[], name:'Rochester Institute of Technology', logo:'', description:'Rochester Institute of Technology', approvalStatus: true, domain:'rit.edu'}]);

    useEffect(()=> {
        const getTeams = async() => {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/teamPub/allExpanded`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    changeTeams(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }

        const getUniversities = async() => {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/universityPub/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    changeUniversities(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }
        getTeams();
        getUniversities();
        // eslint-disable-next-line
    }, []);

    const handleAwayTeamClick = (e) => {
        changeAwayTeamSelected(JSON.parse(e.target[e.target.selectedIndex].value));
    };

    const handleUniversityClick = (e) => {
        changeUnivSelected(e.target[e.target.selectedIndex].value);
    };

    const handleHomeTeamClick = (e) => {
        changeHomeTeamSelected(JSON.parse(e.target[e.target.selectedIndex].value));
        console.log(homeTeamSelected);
    };
    

    async function onSubmitGame(e) {
        e.preventDefault();
         const raw = JSON.stringify({
            "universityID": parseInt(e.target.universityID.value),
            "homeTeam": homeTeamSelected._id,
            "awayTeam": awayTeamSelected._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/gameSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/managegames");
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            })
    }

    async function onSubmitTeam(e) {
        e.preventDefault();
        const players = [
            e.target.player1.value,
            e.target.player2.value
        ];
        if ((e.target.player3.value!=='')) {
            players[2]=e.target.player3.value;
        }
        if ((e.target.player4.value!=='')) {
            players[3]=e.target.player4.value;
        }
        if ((e.target.player5.value!=='')) {
            players[4]=e.target.player5.value;
        }


        const b = {
            "universityID": parseInt(e.target.universityID.value),
            "name": e.target.teamName.value,
            "approvalStatus": e.target.approvalStatus.checked,
            "emails": players,
            "token": user.token,
        };
        const raw = JSON.stringify(b);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/manageteams");
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            })
    }

    async function onSubmitUniversity(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

         const raw = JSON.stringify({
            "description": e.target.universityDescription.value,
            "domain": e.target.universityDomain.value,
            "logo": "",
            "moderatorIDs": [],
            "name": e.target.universityName.value,
            "universityID": parseInt(e.target.universityID.value),
            "token": user.token,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/universitySec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/manageteam");
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            });
    }

    async function onSubmitUser(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "firstName": e.target.firstName.value,
            "lastName": e.target.lastName.value,
            "roleID": parseInt(e.target.roleID.value),
            "teamID": null,
            "email": e.target.email.value,
            "password": e.target.password.value,
            "token": user.token,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/userSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/manageusers");
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log(error);
                alert('Bad! Bad! Did not like that at all >:(');
            });
    }

    const [roleSelected, changeRoleSelected] = useState(19202);
    const handleRoleClick = (e) => {
        changeRoleSelected(e.target[e.target.selectedIndex].value);
    };

    return (
        <>
            {
                (props.show && props.type==="game") && 

                <form className={styles.form} onSubmit={onSubmitGame}>
                    <h1 className={styles.title}>Add Game</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem2} ${styles.center}`} >
                            <p>Home Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="homeTeam" 
                                name="homeTeam" 
                                placeholder='Select Home Team' 
                                value={homeTeamSelected.description} 
                                disabled
                            /> 
                        </div>
                        <select size="3" className={styles.dropdown} onChange={(e) => handleHomeTeamClick(e)}>
                            <option key={0} value={JSON.stringify(nothing)}>{nothing.description}</option>
                            {
                                // eslint-disable-next-line
                                teams.map((team) => {
                                    return (
                                        <option key={team._id} value={JSON.stringify(team)}>{team.description}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles.inputItem2} ${styles.center}`} >
                            <p>Away Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="awayTeam" 
                                name="awayTeam" 
                                placeholder='Select Away Team' 
                                value={awayTeamSelected.description}
                                disabled
                            />
                        </div>
                        <select size="3" className={styles.dropdown} onChange={(e) => handleAwayTeamClick(e)}>
                            <option key={0} value={JSON.stringify(nothing)}>{nothing.description}</option>
                            {
                                // eslint-disable-next-line
                                teams.map((team) => {
                                    return (
                                        <option key={team._id} value={JSON.stringify(team)}>{team.description}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Location</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityID" 
                                name="universityID" 
                                placeholder='Location' 
                                defaultValue='University ID'
                                required 
                            />
                        </div>
                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                name='Add Game' 
                            />
                        </div>
                    </div>
                </form>
            }

            {
                (props.show && props.type==="team") && 

                <form className={styles.form} onSubmit={onSubmitTeam}>
                    <h1 className={styles.title}>Add Team</h1>

                    <div className={styles.padding}>
                    <div className={`${styles.inputItem} ${styles.center}`}>
                        <p>Team Name</p>
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="teamName" 
                            name="teamName" 
                            placeholder='Team Name'
                            required 
                        />
                    </div>
                    <div className={`${styles.inputItem} ${styles.center}`} >
                        <p>University</p>
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="universityID" 
                            name="universityID" 
                            placeholder='Select University' 
                            value={univSelected} 
                            disabled
                        /> 
                    </div>
                        <select size="3" className={styles.dropdown} onChange={(e) => handleUniversityClick(e)}>
                            <option key={0} value={'None'} selected>{'None'}</option>
                            {
                                // eslint-disable-next-line
                                universities.map((university, index) => {
                                    return (
                                        <option key={index} value={university.universityID}>{university.description}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles.inputItem} ${styles.center}`} >
                        <p>Add Players</p>
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="player1" 
                            name="player1" 
                            placeholder='Enter Email' 
                            required
                        /> 
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="player2" 
                            name="player2" 
                            placeholder='Enter Email' 
                            required
                        /> 
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="player3" 
                            name="player3" 
                            placeholder='Enter Email' 
                        /> 
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="player4" 
                            name="player4" 
                            placeholder='Enter Email' 
                        /> 
                        <input 
                            className={styles.inputText} 
                            type="text" 
                            id="player5" 
                            name="player5" 
                            placeholder='Enter Email' 
                        /> 
                        </div>
        
                        <CFormSwitch 
                            id="approvalStatus" 
                            label="Approved" 
                            type="checkbox" 
                            onChange={(e) => { 
                                const isChecked = document.getElementById("approvalStatus").checked;
                                document.getElementById("approvalStatus").style.backgroundColor = isChecked ?  "#2E8D93" : "#FFFFFF";
                            }}
                        />

                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                name='Add Team' 
                            />
                        </div>
                    </div>
                </form>
            }

            {
                (props.show && props.type==="university") && 

                <form className={styles.form} onSubmit={onSubmitUniversity}>
                    <h1 className={styles.title}>Add University</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>ID</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityID" 
                                name="universityID" 
                                placeholder='University ID'
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Name</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityName" 
                                name="universityName" 
                                placeholder='University Name'
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Domain</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityDomain" 
                                name="universityDomain" 
                                placeholder='University Domain' 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItemBox}`}>
                            <p>Description</p>
                            <textarea 
                                className={styles.textArea} 
                                type="text" 
                                id="universityDescription" 
                                name="universityDescription" 
                                placeholder='University Description'  
                            />
                        </div>

                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                name='Add University' 
                            />
                        </div>
                    </div>
                </form>
            }

            {
                (props.show && props.type==="user") && 

                <form className={styles.form} onSubmit={onSubmitUser}>
                    <h1 className={styles.title}>Add User</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Name</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                placeholder='First Name' 
                                required 
                            />
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                placeholder='Last Name' 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Role</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="roleID" 
                                name="roleID" 
                                placeholder='Role ID' 
                                value={roleSelected}
                                disabled 
                            />
                        </div>

                        <select size="3" className={styles.dropdown} onChange={(e) => handleRoleClick(e)}>
                            <option key={0} value={14139}>Admin</option>
                            <option key={1} value={21149}>Content Moderator</option>
                            <option key={2} value={31514}>University Moderator</option>
                            <option key={3} value={19202} selected>Registered User</option>
                        </select>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Email</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="email" 
                                name="email" 
                                placeholder='Email' 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Password</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="password" 
                                name="password" 
                                placeholder='Password' 
                                required 
                            />
                        </div>

                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                name='Add User' 
                            />
                        </div>
                    </div>
                </form>
            }
        </>
    )
}