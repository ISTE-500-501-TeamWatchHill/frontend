import React from 'react';
import styles from './create-team.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import landscapeImage from '../../../assets/images/loginsidepanel.png';
import Button from '../../../components/button/button';
import Spacer from '../../../components/spacer/spacer';

const CreateTeam = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();

    function onSubmit(e) {
        e.preventDefault();

        // ask to get backend changed to accept emails instead of ids
        // strip out empty inputs
        // create object to POST
        // make POST request
            // show error message if POST request fails
            // or redirect to the page created for the team
    }

    return (
        <>
            {!user && (
                <Navigate to="/login" replace={true} />
            )}
            
            <div className={styles.login_section}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <h1 className={styles.title}>Create a new team</h1>
                    <input className={styles.inputText} type="text" id="teamName" name="teamName" placeholder='Team Name' required />
                    <input className={styles.inputText} type="email" id="playerOne" name="playerOne" value={`${user.email}*`} disabled />
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