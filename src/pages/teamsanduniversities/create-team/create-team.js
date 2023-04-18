import React from 'react';
import styles from './create-team.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import landscapeImage from '../../../assets/images/loginsidepanel.png';
import Button from '../../../components/button/button';

const CreateTeam = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();

    async function onSubmit(e) {
        //Retreive the user creating the team and any other emails that are filled in
        const playerOne = user.email;
        const playerTwo = e.target.playerTwo.value;
        const playerThree = e.target.playerThree.value;
        const playerFour = e.target.playerFour.value;
        const playerFive = e.target.playerFive.value;

        //Consolidating emails into one array to send
        let formValues = [playerOne];

        if (playerTwo) { formValues.push(playerTwo) }
        if (playerThree) { formValues.push(playerThree) }
        if (playerFour) { formValues.push(playerFour) }
        if (playerFive) { formValues.push(playerFive) }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "universityID": user.universityID,
            "name": e.target.teamName.value,
            "emails": formValues,
            "token": user.token,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        //Attempt to create team
        await fetch(`${BASE_URL}/teamSec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result && result._id) {
                    navigate(`/team/${result._id}`);
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            }); // TODO: display error, refresh form
    }

    return (
        <>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            
            <div className={styles.login_section}>
                {/* Form for filling in user emails. The user currently trying to create the team will be autofilled in the first email space and unchangable */}
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.title}>Create a new team</h1>
                    <input className={styles.inputText} type="text" id="teamName" name="teamName" placeholder='Team Name' required />
                    {user && <input className={styles.inputText} type="email" id="playerOne" name="playerOne" value={`${user.email}*`} disabled />}
                    <input className={styles.inputText} type="email" id="playerTwo" name="playerTwo" placeholder="Player 2's email" />
                    <input className={styles.inputText} type="email" id="playerThree" name="playerThree" placeholder="Player 3's email" />
                    <input className={styles.inputText} type="email" id="playerFour" name="playerFour" placeholder="Player 4's email" />
                    <input className={styles.inputText} type="email" id="playerFive" name="playerFive" placeholder="Player 5's email" />
                    <Button type='submit' name='Create Team' width='100%' />
                </form>
                
                <img src={landscapeImage} alt="Landscape" />
            </div>
        </>
    );
}

export default CreateTeam;