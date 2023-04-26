import React, {useState} from 'react';
import { useTranslation } from "react-i18next";
import styles from './login.module.css';
//import globalStyles from '../pages.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import BackArrow from '../../components/backarrow/backarrow';
import Toast from '../../components/toast/toast';

import landscapeImage from '../../assets/images/loginsidepanel.png';

const Login = () => {
    const { t } = useTranslation();

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');

    // used for redirect after successful login
    const navigate = useNavigate();

    //To keep the status of when messages need to be shown
    const [toastOpen, setToastOpen] = useState(false);

    
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
                    sameSite: 'strict',
                    expires: new Date(Date.now()+86400000) // expires in one dayish
                };
                cookies.set('user', result.user, options);
                navigate('/');
                navigate(0);
            })
            .catch(function(error) {
                console.log('error', error);
                //Display the error
                setToastOpen(true);
            });
    }


    return (
          <>
            {user && (
                <Navigate to="/" replace={true} />
            )}
            <div className={styles.login_section}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.arrow}>
                        <BackArrow text={t("back.login")} route="/"/>
                    </div>
                    <h1 className={styles.title}>{t("login.login")}</h1>
                    <input className={styles.inputText} type="email" id="email" name="email" placeholder={t("email.login")} required></input>
                    <input className={styles.inputText} type="password" id="password" name="password" placeholder={t("password.login")} required></input>
                    <Button type='submit' name={t("login.login")} width='100%' />
                    <Spacer height='36px' />
                    <h4 className={styles.h4}>{t("notRegistered.login")} <a className={styles.link} href="/register">{t("registerHere.login")}</a></h4>

                    {
                    toastOpen &&
                    <Toast 
                        title="Login Attempt Failed"
                        message="Please check to ensure your username and password are correct." 
                        onclick={() => setToastOpen(false)}
                    />
                    }
                </form>
                
                <img src={landscapeImage} alt="Landscape" />                
            </div>
          </>
    )
};
  
export default Login;