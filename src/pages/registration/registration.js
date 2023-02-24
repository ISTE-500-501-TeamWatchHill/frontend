import React from 'react'
import styles from './registration.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';

const Registration = (props) => {   

    // TODO
    async function onSubmit(e) {
        // e.preventDefault();
        // const loginFormValues = {
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        // };
        // console.log(loginFormValues);
    
        // TODO
        // This will send a post request to update the data in the database.
        // await fetch(`http://localhost:3001/login`, {
        //   method: "POST",
        //   body: JSON.stringify(loginFormValues),
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // });
    
        // navigate("/");
    }

    return (
          <>
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