import React, {useState, useEffect} from 'react'
// import globalStyles from '../../pages/pages.module.css';
import { useNavigate } from "react-router-dom";
import styles from './editpopup.module.css';
import Cookies from 'universal-cookie';
import Button from '../button/button';
import { CFormSwitch } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'

export default function EditPopup(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const nothing = {_id: 'None', approvalStatus: true, description: "None", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "None", domain: "", logo: "", name: "", universityID: 1}]};
    
    //Setup for hook for teams
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [teamSelected, changeTeamSelected] = useState(props.data.teamID ? props.data.teamID : 0);
    const [awayTeamSelected, changeAwayTeamSelected] = useState(props.data.awayTeam ? props.data.awayTeam : 'None');
    const [homeTeamSelected, changeHomeTeamSelected] = useState(props.data.homeTeam ? props.data.homeTeam : 'None');
    const [roleSelected, changeRoleSelected] = useState(props.data.roleID ? props.data.roleID : 0);
    const [winnerSelected, changeWinnerSelected] = useState(props.data.winningTeam ? props.data.winningTeam : "None");
    const starterDate = (props.data.gameTime)? props.data.gameTime.substr(0,16): '';
    const [universities, changeUniversities] = useState([{_id: 'None', universityID: 2760, moderatorIDs:[], name:'Rochester Institute of Technology', logo:'', description:'Rochester Institute of Technology', approvalStatus: true, domain:'rit.edu'}]);
    const [univSelected, changeUnivSelected]= useState(props.data.universityInfo ? props.data.universityInfo[0].universityID : 0);
    const [members, setMembers] = useState([]);


    useEffect(()=> {
        const fetchMember = async (userID) => {
            const raw = JSON.stringify({
              "id": userID
            });
        
            const requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
            };
        
            await fetch(`${BASE_URL}/userPub/byID`, requestOptions)
              .then(response => response.json())
              .then(function(result) { 
                setMembers(current => [...current, result]); //set 
              })
              .catch(function(error) {
                console.log('error', error);
              });
        }

        if (props.type==="team") {
            setMembers([]); 
            props.data.players.forEach(player => {
                fetchMember(player);
            });
        }

        const getTeams = async () => {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/teamPub/allExpanded`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    changeTeams(result);
                    
                    if (props.data.teamInfoJoined === undefined || props.data.teamInfoJoined.length === 0) {
                        changeTeamSelected('None');
                    } else {
                        changeTeamSelected(props.data.teamID);
                    }
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
    }, [props.data]);

    const handleUniversityClick = (e) => {
        changeUnivSelected(e.target[e.target.selectedIndex].value);
    };

    const handleTeamClick = (e) => {
        changeTeamSelected(e.target[e.target.selectedIndex].value); 
    };

    const handleAwayTeamClick = (e) => {
        changeAwayTeamSelected(e.target[e.target.selectedIndex].value);
    };

    const handleHomeTeamClick = (e) => {
        changeHomeTeamSelected(e.target[e.target.selectedIndex].value); 
    };

    const handleRoleClick = (e) => {
        changeRoleSelected(e.target[e.target.selectedIndex].value);
    };
    
    const handleWinnerClick = (e) => {
        changeWinnerSelected(e.target[e.target.selectedIndex].value);
    };

    async function onSubmitGame(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = {
            "token": user.token,
            "id": props.data._id,
            "updatedData": {
                "universityID": e.target.location.value,
                "homeTeam": (homeTeamSelected !== 'Team One')? homeTeamSelected : props.data.homeTeam,
                "awayTeam": (awayTeamSelected !== 'Team Two')? awayTeamSelected : props.data.awayTeam,
                "winningTeam": (winnerSelected !== 'Team One')? winnerSelected : props.data.winningTeam,
                "gameFinished": props.data.gameFinished,
                "gameTime": e.target.time.value
            }
        };

        const b = JSON.stringify(raw);


        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: b,
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
            }); 
    }

    async function onSubmitTeam(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const playerOne = e.target.player1.value;
        const playerTwo = e.target.player2.value;
        const playerThree = e.target.player3.value;
        const playerFour = e.target.player4.value;
        const playerFive = e.target.player5.value;

        let emails = [playerOne];

        if (playerTwo) { emails.push(playerTwo) }
        if (playerThree) { emails.push(playerThree) }
        if (playerFour) { emails.push(playerFour) }
        if (playerFive) { emails.push(playerFive) }

        const raw = {
            "token": user.token,
            "id": props.data._id,
            "updatedData": {
                "universityID": parseInt(e.target.universityID.value),
                "emails": emails,
                "description": e.target.teamName.value,
                "approvalStatus": e.target.approvalStatus.checked,
            }
        };

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(raw),
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
            }); 
    }

    async function onSubmitUniversity(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

         const raw = JSON.stringify({
            "approvalStatus": props.data.approvalStatus,
            "description": e.target.universityDescription.value,
            "domain": e.target.universityDomain.value,
            "logo": props.data.logo,
            "moderatorIDs": props.data.moderatorIDs,
            "name": e.target.universityName.value,
            "universityID": props.data.universityID,
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/universitySec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/manageuniversities");
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
            "id": props.data._id,
            "roleID": e.target.roleID.value,
            "teamID": teamSelected,
            "universityID": props.data.universityID,
            "firstName": e.target.firstName.value,
            "lastName": e.target.lastName.value,
            "email": e.target.email.value,
            "canMarket": props.data.canMarket,
            "token": user.token,
        });

        const requestOptions = {
            method: 'PUT',
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
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            }); 
    }

    function renderRestOfRows()  {
        const rows = []
        for(let index=members.length; index<5; index++) {
            rows.push(
                <>
                    <input 
                        key={index}
                        className={styles.inputText} 
                        type="text"
                        id={`player${index+1}`}
                        name={`player${index+1}`} 
                        placeholder='Enter Email'
                    />
                </>
            );
        }
        return rows;
    }

    return (
        <>
            {
                (props.show && props.type==="game") && 

                <form className={styles.form} onSubmit={onSubmitGame}>
                    <h1 className={styles.title}>Update Game</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem2} ${styles.center}`}>
                            <p>Home Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="homeTeam" 
                                name="homeTeam" 
                                placeholder='Select Home Team' 
                                value={(homeTeamSelected !== 'Team One')? homeTeamSelected : props.data.homeTeam}
                                disabled
                            />
                        </div>
                        {/* // eslint-disable-next-line */}
                        <select size="3" className={styles.dropdown} onChange={(e) => handleHomeTeamClick(e)}>
                            <option key={0} value={nothing._id}>{nothing.description}</option>
                            {
                                // eslint-disable-next-line
                                teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team._id} selected={((team._id===homeTeamSelected) || (team._id===props.data.homeTeam && homeTeamSelected==='Team One'))}>{team.description}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles.inputItem2} ${styles.center}`}>
                            <p>Away Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="awayTeam" 
                                name="awayTeam" 
                                placeholder='Select Away Team' 
                                value={(awayTeamSelected !== 'Team Two')? awayTeamSelected : props.data.awayTeam}  
                                disabled
                            />
                        </div>
                            {/* // eslint-disable-next-line */}
                        <select size="3" className={styles.dropdown} onChange={(e) => handleAwayTeamClick(e)}>
                            <option key={0} value={nothing._id}>{nothing.description}</option>
                            {
                                // eslint-disable-next-line
                                teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team._id} selected={((team._id===awayTeamSelected) || (team._id===props.data.awayTeam && awayTeamSelected==='Team Two'))}>{team.description}</option>
                                    )
                                })
                            }
                        </select>
                        <div className={`${styles.inputItem2} ${styles.center}`}>
                            <p>Winning Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="winner" 
                                name="winner" 
                                placeholder='Select Winning Team' 
                                value={(winnerSelected !== 'Team One')? winnerSelected : props.data.winningTeam}  
                                disabled
                            />
                        </div>
                        <select size="2" className={styles.dropdown} onChange={(e) => handleWinnerClick(e)}>
                        {/* // eslint-disable-next-line */}
                            <option key={0} value={null} selected={((null===winnerSelected) || (null===props.data.winningTeam && winnerSelected==='Team One'))}>None</option>
                            <option key={1} value={props.data.homeTeam} selected={((props.data.homeTeam===winnerSelected) || (props.data.homeTeam===props.data.winningTeam && winnerSelected==='Team One'))}>{props.data.homeTeamInfo[0].description}</option>
                            <option key={2} value={props.data.awayTeam} selected={((props.data.awayTeam===winnerSelected) || (props.data.awayTeam===props.data.winningTeam && winnerSelected==='Team One'))}>{props.data.awayTeamInfo[0].description}</option>
                        </select>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Location</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="location" 
                                name="university" 
                                placeholder='Location' 
                                defaultValue={props.data.universityID} 
                                required 
                            />
                        </div>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Time</p>
                            <input 
                                className={styles.inputText} 
                                type="datetime-local" 
                                id="time" 
                                name="time" 
                                defaultValue={starterDate} 
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
                                name='Update Game' 
                            />
                        </div>
                    </div>
                </form>
            }

            {
                (props.show && props.type==="team") && 

                <form className={styles.form} onSubmit={onSubmitTeam}>
                    <h1 className={styles.title}>Update Team</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Name</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="teamName" 
                                name="teamName" 
                                placeholder='Team Name' 
                                defaultValue={props.data.description} 
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
                            value={(univSelected !== 'None')? univSelected : props.data.universityInfo[0].universityID}
                            disabled
                        /> 
                        </div>
                            <select size="3" className={styles.dropdown} onChange={(e) => handleUniversityClick(e)}>
                                <option key={0} value={'None'}>{'None'}</option>
                                {
                                    // eslint-disable-next-line
                                    universities.map((university, index) => {
                                        return (
                                            <option key={index} value={university.universityID} selected={(props.data.universityInfo[0].universityID===university.universityID)}>{university.description}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className={`${styles.inputItem} ${styles.center}`} > 
                            <p>Edit Players</p>
                            <div className={styles.flex_column}>
                            {
                                // eslint-disable-next-line
                                members.map((member, index) => {
                                    return (
                                        <>
                                            <input 
                                                key={index}
                                                className={styles.inputText} 
                                                type="text"
                                                id={`player${index+1}`}
                                                name={`player${index+1}`} 
                                                placeholder='Enter Email' 
                                                defaultValue={member.email}
                                            />
                                        </>
                                    )
                                })

                            }
                            {renderRestOfRows()}
                            </div>

                             
                        </div>
        
                        <CFormSwitch 
                            id="approvalStatus" 
                            label="Approved" 
                            type="checkbox"
                            // checked={props.data.approvalStatus} // TODO: fix this with state
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
                                name='Update Team' 
                            />
                        </div>
                    </div>
                </form>
            }

            {
                (props.show && props.type==="university") && 

                <form className={styles.form} onSubmit={onSubmitUniversity}>
                    <h1 className={styles.title}>Update University</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Name</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityName" 
                                name="universityName" 
                                placeholder='University Name' 
                                defaultValue={props.data.name} 
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
                                defaultValue={props.data.domain} 
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
                                defaultValue={props.data.description} 
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
                                name='Update University' 
                            />
                        </div>
                    </div>
                </form>
            }

            {
                (props.show && props.type==="user") && 

                <form className={styles.form} onSubmit={onSubmitUser}>
                    <h1 className={styles.title}>Update User</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Name</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="firstName" 
                                name="firstName" 
                                placeholder='First Name' 
                                defaultValue={props.data.firstName} 
                                required 
                            />
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="lastName" 
                                name="lastName" 
                                placeholder='Last Name' 
                                defaultValue={props.data.lastName} 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Email</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="email" 
                                name="email" 
                                placeholder='Email' 
                                defaultValue={props.data.email} 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem2} ${styles.center}`}>
                            <p>Role</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="roleID" 
                                name="roleID" 
                                placeholder='Select Role' 
                                value={roleSelected}  
                                disabled
                            />
                        </div>

                        <select size="3" className={styles.dropdown} onChange={(e) => handleRoleClick(e)}>
                            <option key={0} value={14139} selected={props.data.roleID===14139}>Admin</option>
                            <option key={1} value={21149} selected={props.data.roleID===21149}>Content Moderator</option>
                            <option key={2} value={31514} selected={props.data.roleID===31514}>University Moderator</option>
                            <option key={3} value={19202} selected={props.data.roleID===19202}>Registered User</option>
                        </select>

                        <div className={`${styles.inputItem2} ${styles.center}`}>
                            <p>Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="team" 
                                name="team" 
                                placeholder='Select Team Name' 
                                value={(teamSelected !== 0) ?  teamSelected : props.data.teamID}  
                                disabled
                            />
                        </div>

                        <select size="3" className={styles.dropdown} onChange={(e) => handleTeamClick(e)}>
                            <option key={0} value={'None'}>{nothing.description}</option>
                            {
                                // eslint-disable-next-line
                                teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team._id} selected={props.data.teamID===team._id}>{team.description}</option>
                                    )
                                })
                            }
                        </select>

                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                name='Update User' 
                            />
                        </div>
                    </div>
                </form>
            }
            
        </>
    )
}