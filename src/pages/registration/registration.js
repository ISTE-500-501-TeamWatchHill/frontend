import React from 'react'
import styles from './registration.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const Registration = () => {  
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    
    const navigate = useNavigate();
    
    async function onSubmit(e) {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        /**
         * >= 8 characters
         * alphanumeric
         * require special characters
         */
        const raw = JSON.stringify({
            "uid": 1423518, // TODO: get university IDs dynamically
            "firstName": e.target.fname.value,
            "lastName": e.target.lname.value,
            "email": e.target.email.value,
            "password": e.target.password.value,
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/register`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                cookies.set('user', result.user);
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
                <h1 className={styles.title}>Register</h1>
                <Spacer height='40px' />
                <form className={styles.form} onSubmit={onSubmit}>
                    <input className={`${styles.inputText} ${styles.short}`} type="text" id="fname" name="fname" placeholder='First Name' required></input>
                    <input className={`${styles.inputText} ${styles.short}`} type="text" id="lname" name="lname" placeholder='Last Name' required></input><br/>
                    <Spacer height='18px' />
                    <input className={styles.inputText} type="text" id="university" name="university" placeholder='University' required></input><br/>
                    <Spacer height='18px' />
                    <input className={styles.inputText} type="email" id="email" name="email" placeholder='University Email' required></input><br/>
                    <Spacer height='18px' />
                    <input className={styles.inputText} type="password" id="password" name="password" placeholder='Password' required></input><br/>
                    <Spacer height='18px' />
                    <Button type='submit' name='Register' width='100%' />
                    <Spacer height='40px' />
                <Spacer height='9px' />
                <h4 className={styles.h4}>Already registered? <a className={styles.link} href="/login">Login here</a></h4>
                </form>
            </div>
          </>
    )
};
  
export default Registration;