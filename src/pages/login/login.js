import React from 'react'
import styles from './login.module.css';
// import globalStyles from '../pages.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';

const Login = (props) => {   
    return (
          <>
            <div className={styles.login_section}>
                <h1 className={styles.title}>Login</h1>
                <Spacer height='40px' />
                <form className={styles.form} action="/login" method="POST">
                    <input className={styles.inputText} type="text" id="email" name="email" placeholder='Email' required></input><br/>
                    <Spacer height='18px' />
                    <input className={styles.inputText} type="password" id="password" name="password" placeholder='Password' required></input><br/>
                    <Spacer height='18px' />
                    {/* <input type="submit" value="Login"></input> */}
                    <Button type='submit' name='Login' width='100%' />
                </form>
                <Spacer height='40px' />
                <h4> Not registered for the tournament yet? <a href="/register">Register here</a></h4>
                <Spacer height='9px' />
                <h4> Forgot your password? <a href="/">Reset here</a></h4>
            </div>
          </>
    )
};
  
export default Login;