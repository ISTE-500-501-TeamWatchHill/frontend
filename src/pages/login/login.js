import React from 'react'
import styles from './login.module.css';
//import globalStyles from '../pages.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import BackArrow from '../../components/backarrow/backarrow';

import landscapeImage from '../../assets/images/loginsidepanel.png';

const Login = () => {
    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');

    // used for redirect after successful login
    const navigate = useNavigate();

    
    async function onSubmit(e) { 
        e.preventDefault();

        //TODO: move out login to methods.js 
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // TODO: Sanitize data and make consts for future use
        const raw = JSON.stringify({
            "email": e.target.email.value,
            "password": e.target.password.value,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/login`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                const options = {
                    path: '/',
                    secure: true,
                    sameSite: 'strict',
                    expires: new Date(Date.now()+8640000) // expires in one day
                };
                cookies.set('user', result.user, options);
                navigate('/');
                navigate(0);
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            }); // TODO: display error, refresh form
    }


    return (
          <>
            {user && (
                <Navigate to="/" replace={true} />
            )}
            <div className={styles.login_section}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.arrow}>
                        <BackArrow text="Back to Homepage" route="/"/>
                    </div>
                    <h1 className={styles.title}>Login</h1>
                    <input className={styles.inputText} type="email" id="email" name="email" placeholder='Email' required></input>
                    <input className={styles.inputText} type="password" id="password" name="password" placeholder='Password' required></input>
                    <Button type='submit' name='Login' width='100%' />
                    <Spacer height='36px' />
                    <h4 className={styles.h4}>Not registered for the tournament yet? <a className={styles.link} href="/register">Register here</a></h4>
                    <h4 className={styles.h4}>Forgot your password? <a className={styles.link} href="/">Reset here</a></h4>
                </form>
                
                <img src={landscapeImage} alt="Landscape" />
            </div>
          </>
    )
};
  
export default Login;