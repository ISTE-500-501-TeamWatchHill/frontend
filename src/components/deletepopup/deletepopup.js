import React, {useState} from 'react'
import styles from './deletepopup.module.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Button from '../button/button';

export default function DeletePopup(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();
    const [hasError, changeHasError] = useState(false);


    //Authorized user is on the manage games page and clicked the delete game button for one of the games
    async function onSubmitGame(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the ID information and turn it into JSON
         const raw = JSON.stringify({
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //Attempt to delete the game
        await fetch(`${BASE_URL}/gameSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage games page (closing popup) 
                        //which will display the games where the one is now gone
                    navigate("/managegames");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error deleting the game on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            });
    };

    //Authorized user is on the manage teams page and clicked the delete team button for one of the teams
    async function onSubmitTeam(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the ID information and turn it into JSON
         const raw = JSON.stringify({
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //Attempt to delete the team
        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage teams page (closing popup) 
                        //which will display the teams where the one is now gone
                    navigate("/manageteams");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error deleting the team on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            });
    };

    //Authorized user is on the manage universities page and clicked the delete university button for one of the universities
    async function onSubmitUniversity(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the ID information and turn it into JSON
         const raw = JSON.stringify({
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //Attempt to delete the university
        await fetch(`${BASE_URL}/universitySec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage universities page (closing popup) 
                        //which will display the universities where the one is now gone
                    navigate("/manageuniversities");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error deleting the university on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            });
    }

    //Authorized user is on the manage users page and clicked the delete user button for one of the users
    async function onSubmitUser(e) {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        //Prepare the ID information and turn it into JSON
         const raw = JSON.stringify({
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //Attempt to delete the user
        await fetch(`${BASE_URL}/userSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    //If it is successful, navigate back to the manage users page (closing popup) 
                        //which will display the universities where the one is now gone
                    navigate("/manageusers");
                    navigate(0);
                }
            })
            .catch(function(error) {
                //But if there was an error deleting the user on the backend, 
                    //log it in the console and 
                    //change the error state (will close popup and display unique error message)
                console.log('error', error);
                changeHasError(true);
            });
    }

    return (
        <>
            {/* The delete popup should be shown and specifically for the game form 
                (delete button was clicked on manage games page) */}
            {
                (props.show && props.type==="game") && 

                <form className={styles.form} onSubmit={onSubmitGame}>
                    <h1 className={styles.title}>Delete Game</h1>

                    <div className={styles.padding}>
                        {/* Delete confirmation form component */}
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Are you sure you want to delete game between {props.data.homeTeamInfo[0].description} and {props.data.awayTeamInfo[0].description}?</p>
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
                                name='Confirm Delete' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The delete popup should be shown and specifically for the team form 
                (delete button was clicked on manage teams page) */}
            {
                (props.show && props.type==="team") && 

                <form className={styles.form} onSubmit={onSubmitTeam}>
                    <h1 className={styles.title}>Delete Team</h1>

                    <div className={styles.padding}>
                        {/* Delete confirmation form component */}
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Are you sure you want to delete team {props.data.description}?</p>
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
                                name='Confirm Delete' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The delete popup should be shown and specifically for the university form 
                (delete button was clicked on manage universities page) */}
            {
                (props.show && props.type==="university") && 

                <form className={styles.form} onSubmit={onSubmitUniversity}>
                    <h1 className={styles.title}>Delete University</h1>

                    <div className={styles.padding}>
                        {/* Delete confirmation form component */}
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Are you sure you want to delete {props.data.name}?</p>
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
                                name='Confirm Delete' 
                            />
                        </div>
                    </div>
                </form>
            }

            {/* The delete popup should be shown and specifically for the user form 
                (delete button was clicked on manage users page) */}
            {
                (props.show && props.type==="user") && 

                <form className={styles.form} onSubmit={onSubmitUser}>
                    <h1 className={styles.title}>Delete User</h1>

                    <div className={styles.padding}>
                        {/* Delete confirmation form component */}
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Are you sure you want to delete {props.data.firstName} {props.data.lastName}?</p>
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
                                name='Confirm Delete' 
                            />
                        </div>
                    </div>
                </form>
            } 
        </>
    )
}