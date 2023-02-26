import React from 'react'
import styles from './login.module.css';
// import globalStyles from '../pages.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';

const Login = (props) => {   

    async function onSubmit(e) {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

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

        await fetch("http://localhost:3001/login", requestOptions)
            .then(response => response.json())
            .then(function(result) {
                localStorage.setItem('token', result.token);
                alert('Logged in! Will add a redirect here later :)'); // TODO: Add redirect
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            }); // TODO: display error, refresh form
    }


    return (
          <>
            <div className={styles.login_section}>
                <h1 className={styles.title}>Login</h1>
                <Spacer height='40px' />
                <form className={styles.form} onSubmit={onSubmit}>
                    <input className={styles.inputText} type="email" id="email" name="email" placeholder='Email' required></input><br/>
                    <Spacer height='18px' />
                    <input className={styles.inputText} type="password" id="password" name="password" placeholder='Password' required></input><br/>
                    <Spacer height='18px' />
                    <Button type='submit' name='Login' width='100%' />
                    <Spacer height='40px' />
                <h4 className={styles.h4}>Not registered for the tournament yet? <a className={styles.link} href="/register">Register here</a></h4>
                <Spacer height='9px' />
                <h4 className={styles.h4}>Forgot your password? <a className={styles.link} href="/">Reset here</a></h4>
                </form>
            </div>
          </>
    )
};
  
export default Login;