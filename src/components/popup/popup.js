import React from 'react'
import globalStyles from '../../pages/pages.module.css';
import styles from './popup.module.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Button from '../button/button';

export default function Popup(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();


    async function onSubmit(e) {
        //TODO
    };

    // async function onSubmit(e) {
    //     e.preventDefault();

    //     const playerOne = user.email;
    //     const playerTwo = e.target.playerTwo.value;
    //     const playerThree = e.target.playerThree.value;
    //     const playerFour = e.target.playerFour.value;
    //     const playerFive = e.target.playerFive.value;

    //     let formValues = [playerOne];

    //     if (playerTwo) { formValues.push(playerTwo) }
    //     if (playerThree) { formValues.push(playerThree) }
    //     if (playerFour) { formValues.push(playerFour) }
    //     if (playerFive) { formValues.push(playerFive) }

    //     let myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const raw = JSON.stringify({
    //         "universityID": user.universityID,
    //         "name": e.target.teamName.value,
    //         "emails": formValues,
    //         "token": user.token,
    //     });

    //     const requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: raw,
    //         redirect: 'follow'
    //     };

    //     await fetch(`${BASE_URL}/teamSec`, requestOptions)
    //         .then(response => response.json())
    //         .then(function(result) {
    //             // console.log(result);
    //             if (result && result._id) {
    //                 navigate(`/team/${result._id}`);
    //                 navigate(0);
    //             }
    //         })
    //         .catch(function(error) {
    //             console.log('error', error);
    //             alert('Bad! Bad! Did not like that at all >:(');
    //         }); // TODO: display error, refresh form

    //     // ask to get backend changed to accept emails instead of ids
    //     // strip out empty inputs
    //     // create object to POST
    //     // make POST request
    //         // show error message if POST request fails
    //         // or redirect to the page created for the team
    // }

    return (
        <>
            {
                props.show && 

                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.title}>{props.data.description}</h1>

                    <div className={`${styles.inputItem} ${styles.center}`}>
                        <p>Name:</p>
                        <input className={styles.inputText} type="text" id="teamName" name="teamName" placeholder='Team Name' value={props.data.description} required />
                    </div>

                    <div className={styles.inputItem}>
                        <p>Players:</p>
                        <div>
                            <input className={styles.inputText} type="text" id="playerOne" name="playerOne" placeholder='Player 1' value='Player 1' required />
                            <input className={styles.inputText} type="text" id="playerTwo" name="playerTwo" placeholder='Player 2' value='Player 2' required />
                            <input className={styles.inputText} type="text" id="playerThree" name="playerThree" placeholder='Player 3' value='Player 3' required />
                        </div>
                    </div>

                    <div className={styles.flex}>
                        <Button 
                            name="Close"
                            onClick={props.onClick} 
                            backgroundColor="red"
                        />
                        <Button type='submit' name='Update Team' />
                    </div>
                </form>
            }
            
        </>
    )
}