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

    //No team select option
    const nothing = {_id: 1, approvalStatus: true, description: "None", logo: "", players: [], universityID: 1};

    //Setup for hook for teams
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [awayTeamSelected, changeAwayTeamSelected] = useState(nothing);
    const [homeTeamSelected, changeHomeTeamSelected] = useState(nothing);
    const [univSelected, changeUnivSelected]= useState("None");
    const [universities, changeUniversities] = useState([{_id: 'None', universityID: 2760, moderatorIDs:[], name:'Rochester Institute of Technology', logo:'', description:'Rochester Institute of Technology', approvalStatus: true, domain:'rit.edu'}]);
    //Check for error state
    const [hasError, changeHasError] = useState(false);

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
                    //Attempt to retreive teams and their university information
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
                    //Attempt to retreive universities
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

    //Event set up to handle when the away team select is clicked so the associated state variable may be updated
    const handleAwayTeamClick = (e) => {
        changeAwayTeamSelected(JSON.parse(e.target[e.target.selectedIndex].value));
    };

    //Event set up to handle when the university select is clicked so the associated state variable may be updated
    const handleUniversityClick = (e) => {
        changeUnivSelected(e.target[e.target.selectedIndex].value);
    };

    //Event set up to handle when home team select is clicked so the associated state variable may be updated
    const handleHomeTeamClick = (e) => {
        changeHomeTeamSelected(JSON.parse(e.target[e.target.selectedIndex].value));
    };
    

    //Authorized user is on the manage games page and clicked the add game button
    async function onSubmitGame(e) {
        e.preventDefault();
        //Prepare the form information and turn it into JSON
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

        //Attempt to add the new game
        await fetch(`${BASE_URL}/gameSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage games page (closing popup) 
                        //which will display the added game
                    navigate("/managegames");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error adding the game on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            })
    }

    //Authorized user is on the manage teams page and clicked the and clicked the add team button
    async function onSubmitTeam(e) {
        e.preventDefault();

        //Grab the players from the form (some can be blank)
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

        //Prepare the form information and turn it into JSON
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

        //Attempt to add the new team
        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage teams page (closing popup) 
                        //which will display the added team
                    navigate("/manageteams");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error adding the team on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            })
    }

    //Authorized user is on the manage universities page and clicked the add university button
    async function onSubmitUniversity(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the form information and turn it into JSON
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

        //Attempt to add the new university
        await fetch(`${BASE_URL}/universitySec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage universities page (closing popup) 
                        //which will display the added university
                    navigate("/manageuniversities");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error adding the university on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            });
    }

    //Authorized user is on the manage users page and clicked the add user button
    async function onSubmitUser(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the form information and turn it into JSON
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

        //Attempt to add the new user
        await fetch(`${BASE_URL}/userSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage users page (closing popup) 
                        //which will display the added user
                    navigate("/manageusers");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error adding the user on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log(error);
                changeHasError(true);
            });
    }

    //Check for error state
    const [roleSelected, changeRoleSelected] = useState(19202);

    //Event set up to handle when the role select is clicked so the associated state variable may be updated
    const handleRoleClick = (e) => {
        changeRoleSelected(e.target[e.target.selectedIndex].value);
    };

    return (
        <>
            {/* The add popup should be shown and specifically for the game form 
                (add button was clicked on manage games page) */}
            {
                (props.show && props.type==="game") && 

                <form className={styles.form} onSubmit={onSubmitGame}>
                    <h1 className={styles.title}>Add Game</h1>

                    {/* Home team form component and select */}
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
                                //Displays all teams
                                // eslint-disable-next-line
                                teams.map((team) => {
                                    return (
                                        <option key={team._id} value={JSON.stringify(team)}>{team.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Away team form component and select */}
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
                                //Displays all teams
                                // eslint-disable-next-line
                                teams.map((team) => {
                                    return (
                                        <option key={team._id} value={JSON.stringify(team)}>{team.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Location form component and select */}
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Location</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityID" 
                                name="universityID" 
                                placeholder='Location' 
                                value={univSelected}
                                disabled
                            />
                        </div>
                        <select size="3" className={styles.dropdown} onChange={(e) => handleUniversityClick(e)}>
                            {
                                //Displays all universities that serve as locations for game play
                                // eslint-disable-next-line
                                universities.map((university, index) => {
                                    return (
                                        <option key={index} value={university.universityID}>{university.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Close and submit buttons */}
                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                //Will close the popup
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                //If the submit has an error, it will close the popup and display the form message
                                onClick={hasError ? props.changeFailed : null}
                                name='Add Game' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The add popup should be shown and specifically for the team form 
                (add button was clicked on manage teams page) */}
            {
                (props.show && props.type==="team") && 

                <form className={styles.form} onSubmit={onSubmitTeam}>
                    <h1 className={styles.title}>Add Team</h1>

                    {/* Team name form component */}
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

                        {/* University form component and select */}
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
                                //Displays all universities
                                // eslint-disable-next-line
                                universities.map((university, index) => {
                                    return (
                                        <option key={index} value={university.universityID}>{university.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Players form component */}
                        <div className={`${styles.inputItem} ${styles.center}`} >
                            <p>Add Players</p>
                            <div className={styles.flex_column}>
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
                        </div>
            
                        {/* Approval status checkbox form component */}
                        <CFormSwitch 
                            id="approvalStatus" 
                            label="Approved" 
                            type="checkbox" 
                            onChange={(e) => { 
                                const isChecked = document.getElementById("approvalStatus").checked;
                                document.getElementById("approvalStatus").style.backgroundColor = isChecked ?  "#2E8D93" : "#FFFFFF";
                            }}
                        />

                        {/* Close and submit buttons */}
                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                //Will close the popup
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                //If the submit has an error, it will close the popup and display the form message
                                onClick={hasError ? props.changeFailed : null}
                                name='Add Team' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The add popup should be shown and specifically for the university form 
                (add button was clicked on manage universities page) */}
            {
                (props.show && props.type==="university") && 

                <form className={styles.form} onSubmit={onSubmitUniversity}>
                    <h1 className={styles.title}>Add University</h1>

                    {/* University ID form component */}
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

                        {/* University name form component */}
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

                        {/* University domain form component */}
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

                        {/* University description form component */}
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

                        {/* Close and submit buttons */}
                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                //Will close the popup
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                //If the submit has an error, it will close the popup and display the form message
                                onClick={hasError ? props.changeFailed : null}
                                name='Add University' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The add popup should be shown and specifically for the user form 
                (add button was clicked on manage users page) */}
            {
                (props.show && props.type==="user") && 

                <form className={styles.form} onSubmit={onSubmitUser}>
                    <h1 className={styles.title}>Add User</h1>

                    <div className={styles.padding}>
                        {/* User first and last name form component */}
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

                        {/* User role form component and select */}
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

                        {/* User email form component */}
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

                        {/* User password form component */}
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

                        {/* Close and submit buttons */}
                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                //Will close the popup
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                //If the submit has an error, it will close the popup and display the form message
                                onClick={hasError ? props.changeFailed : null}
                                name='Add User' 
                            />
                        </div>
                    </div>
                </form>
            }
        </>
    )
}