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
    //Check for error state
    const [hasError, changeHasError] = useState(false);


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
                //Attempt to retreive team members
                setMembers(current => [...current, result]); 
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
                    //Attempt to retreive team
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
                    //Attempt to retreive university
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

    //Event set up to handle when the university select is clicked so the associated state variable may be updated
    const handleUniversityClick = (e) => {
        changeUnivSelected(e.target[e.target.selectedIndex].value);
    };

    //Event set up to handle when the team select is clicked so the associated state variable may be updated
    const handleTeamClick = (e) => {
        changeTeamSelected(e.target[e.target.selectedIndex].value); 
    };

    //Event set up to handle when the away team select is clicked so the associated state variable may be updated
    const handleAwayTeamClick = (e) => {
        changeAwayTeamSelected(e.target[e.target.selectedIndex].value);
    };

    //Event set up to handle when the home team select is clicked so the associated state variable may be updated
    const handleHomeTeamClick = (e) => {
        changeHomeTeamSelected(e.target[e.target.selectedIndex].value); 
    };

    //Event set up to handle when the role select is clicked so the associated state variable may be updated
    const handleRoleClick = (e) => {
        changeRoleSelected(e.target[e.target.selectedIndex].value);
    };
    
    //Event set up to handle when the game winner select is clicked so the associated state variable may be updated
    const handleWinnerClick = (e) => {
        changeWinnerSelected(e.target[e.target.selectedIndex].value);
    };

    //Authorized user is on the manage games page and clicked the edit game button for one of the games
    async function onSubmitGame(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the form information and turn it into JSON
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

        //Attempt to edit the game
        await fetch(`${BASE_URL}/gameSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage games page (closing popup) 
                        //which will display the edited game
                    navigate("/managegames");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error editing the game on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            }); 
    }

    //Authorized user is on the manage teams page and clicked the edit team button for one of the teams
    async function onSubmitTeam(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Grab the players from the form (some can be blank)
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

        //Prepare the form information and turn it into JSON
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

        //Attempt to edit the team
        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage teams page (closing popup) 
                        //which will display the edited team
                    navigate("/manageteams");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error editing the team on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            }); 
    }

    //Authorized user is on the manage universities page and clicked the edit university button for one of the universities
    async function onSubmitUniversity(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the form information and turn it into JSON
         const raw = JSON.stringify({
            "approvalStatus": props.data.approvalStatus,
            "description": e.target.universityDescription.value,
            "domain": e.target.universityDomain.value,
            "logo": props.data.logo,
            "moderatorIDs": props.data.moderatorIDs,
            "name": e.target.universityName.value,
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //Attempt to edit the university
        await fetch(`${BASE_URL}/universitySec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage universities page (closing popup) 
                        //which will display the edited university
                    navigate("/manageuniversities");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error editing the university on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            }); 
    }

    //Authorized user is on the manage users page and clicked the edit user button for one of the users
    async function onSubmitUser(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the form information and turn it into JSON
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

        //Attempt to edit the user
        await fetch(`${BASE_URL}/userSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage users page (closing popup) 
                        //which will display the edited user
                    navigate("/manageusers");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error editing the user on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
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
            {/* The edit popup should be shown and specifically for the game form 
                (edit button was clicked on manage games page) */}
            {
                (props.show && props.type==="game") && 

                <form className={styles.form} onSubmit={onSubmitGame}>
                    <h1 className={styles.title}>Update Game</h1>

                    <div className={styles.padding}>
                        {/* Home team form component and select */}
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
                                //Displays all teams
                                // eslint-disable-next-line
                                teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team._id} selected={((team._id===homeTeamSelected) || (team._id===props.data.homeTeam && homeTeamSelected==='Team One'))}>{team.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Away team form component and select */}
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
                                //Displays all teams
                                // eslint-disable-next-line
                                teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team._id} selected={((team._id===awayTeamSelected) || (team._id===props.data.awayTeam && awayTeamSelected==='Team Two'))}>{team.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Winning team form component and select */}
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

                        {/* Location form component */}
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

                        {/* Datetime form component */}
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
                                name='Update Game' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The edit popup should be shown and specifically for the team form 
                (edit button was clicked on manage teams page) */}
            {
                (props.show && props.type==="team") && 

                <form className={styles.form} onSubmit={onSubmitTeam}>
                    <h1 className={styles.title}>Update Team</h1>

                    <div className={styles.padding}>
                        {/* Team name form component */}
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

                        {/* University form component and select */}
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
                                //Displays all universities
                                // eslint-disable-next-line
                                universities.map((university, index) => {
                                    return (
                                        <option key={index} value={university.universityID} selected={(props.data.universityInfo[0].universityID===university.universityID)}>{university.description}</option>
                                    )
                                })
                            }
                        </select>

                        {/* Players form component */}
                        <div className={`${styles.inputItem} ${styles.center}`} > 
                            <p>Edit Players</p>
                            <div className={styles.flex_column}>
                            {
                                //Displays current members in the team
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
        
                        {/* Approval status checkbox form component */}
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
                                name='Update Team' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The edit popup should be shown and specifically for the university form 
                (edit button was clicked on manage universities page) */}
            {
                (props.show && props.type==="university") && 

                <form className={styles.form} onSubmit={onSubmitUniversity}>
                    <h1 className={styles.title}>Update University</h1>

                    <div className={styles.padding}>
                        {/* University name form component */}
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

                        {/* University domain form component */}
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

                        {/* University description form component */}
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
                                name='Update University' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The edit popup should be shown and specifically for the user form 
                (edit button was clicked on manage users page) */}
            {
                (props.show && props.type==="user") && 

                <form className={styles.form} onSubmit={onSubmitUser}>
                    <h1 className={styles.title}>Update User</h1>

                    <div className={styles.padding}>
                        {/* First and last name form component */}
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

                        {/* User email form component */}
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

                        {/* User role form component and select */}
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

                        {/* User team form component and select */}
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
                                //Displays all teams
                                // eslint-disable-next-line
                                teams.map((team, index) => {
                                    return (
                                        <option key={index} value={team._id} selected={props.data.teamID===team._id}>{team.description}</option>
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
                                name='Update User' 
                            />
                        </div>
                    </div>
                </form>
            }
            
        </>
    )
}