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
    const nothing = {_id: 1, approvalStatus: true, description: "None", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "None", domain: "", logo: "", name: "", universityID: 1}]};

    //Setup for hook for teams
    const [teams, changeTeams] = useState([{ _id: 1, approvalStatus: true, description: "Team One", logo: "", players: [], universityInfo: [{approvalStatus: true, description: "", domain: "", logo: "", name: "", universityID: 1}] }]);
    const [teamSelected, changeTeamSelected] = useState(nothing);
    const [roleSelected, changeRoleSelected] = useState(props.data.roleID);

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

    const handleRoleClick = (e) => {
        changeRoleSelected(e.target[e.target.selectedIndex].value);
    };
    

    async function onSubmitGame(e) {
        //TODO
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
                        {/* ALEXIS: TODO */}

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