import React, {useState, useEffect} from 'react'
// import globalStyles from '../../pages/pages.module.css';
import { useNavigate } from "react-router-dom";
import styles from './editpopup.module.css';
import Cookies from 'universal-cookie';
import Button from '../button/button';

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
    const [teamSelected, changeTeamSelected] = useState(nothing);
    const [awayTeamSelected, changeAwayTeamSelected] = useState(props.data.awayTeam); //_id
    const [homeTeamSelected, changeHomeTeamSelected] = useState(props.data.homeTeam); //_id
    const [roleSelected, changeRoleSelected] = useState(props.data.roleID);
    const [winnerSelected, changeWinnerSelected] = useState(props.data.winningTeam);
    const starterDate = props.data.gameTime.substr(0,16);

    useEffect(()=> {
        async function getTeams() {
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
                        changeTeamSelected(nothing);
                    } else {
                        changeTeamSelected(teams.find(team => team._id === props.data.teamInfoJoined._id));
                    }
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }
        getTeams();
        // eslint-disable-next-line
    }, []);


    const handleTeamClick = (e) => {
        changeTeamSelected(JSON.parse(e.target[e.target.selectedIndex].value));
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
                    console.log("Result", result);
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
        //TODO
    }

    async function onSubmitUniversity(e) {
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
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

         const raw = JSON.stringify({
            "id": props.data._id,
            "roleID": e.target.roleID.value,
            "teamID": teamSelected._id,
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

                        {/* ALEXIS: Currently waiting to edit players and team as a whole until user functionality is done */}

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
                            <option key={0} value={14139}>Admin</option>
                            <option key={1} value={21149}>Content Moderator</option>
                            <option key={2} value={31514}>University Moderator</option>
                            <option key={3} value={19202}>Registered User</option>
                        </select>

                        <div className={`${styles.inputItem2} ${styles.center}`}>
                            <p>Team</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="team" 
                                name="team" 
                                placeholder='Select Team Name' 
                                value={teamSelected.description}  
                                disabled
                            />
                        </div>

                        <select size="3" className={styles.dropdown} onChange={(e) => handleTeamClick(e)}>
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

                        {/* TODO: Add option to change role and university with dropdowns */}

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