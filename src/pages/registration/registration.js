import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import styles from './registration.module.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import BackArrow from '../../components/backarrow/backarrow';
import Toast from '../../components/toast/toast';

import landscapeImage from '../../assets/images/registersidepanel.png';

const Registration = () => {  
    const { t } = useTranslation();
    
    const [universities, changeUniversities] = useState([{_id: 'None', universityID: 2760, moderatorIDs:[], name:'Rochester Institute of Technology', logo:'', description:'Rochester Institute of Technology', approvalStatus: true, domain:'rit.edu'}]);
    const [univSelected, changeUnivSelected]= useState('University');

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    // eslint-disable-next-line
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const navigate = useNavigate();

    //To keep the status of when messages need to be shown
    const [toastOpen, setToastOpen] = useState(false);

    useEffect(()=> {
        const getUniversities = async() => {
            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch(`${BASE_URL}/universityPub/all`, requestOptions)
                .then(response => response.json())
                .then(function(result) {
                    changeUniversities(result);
                })
                .catch(function(error) {
                    console.log('error', error);
                });
        }

        getUniversities();
    });

    const handleUniversityClick = (e) => {
        changeUnivSelected(e.target[e.target.selectedIndex].value);
    };
    
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
            "universityID": parseInt(e.target.universityID.value),
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
            <div className={styles.register_section}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <div className={styles.arrow}>
                        <BackArrow text={t("back.login")} route="/"/>
                    </div>
                    <h1 className={styles.title}>{t("register.register")}</h1>
                    <div className={styles.short}>
                        <input className={styles.inputText} type="text" id="fname" name="fname" placeholder={t("firstName.register")} required></input>
                        <input className={styles.inputText} type="text" id="lname" name="lname" placeholder={t("lastName.register")} required></input>
                    </div>
                    <div className={`${styles.inputItem} ${styles.center}`} >
                        <p>{t("university.register")}</p>
                        <input 
                            className={`${styles.inputText}`} 
                            type="text" 
                            id="universityID" 
                            name="universityID" 
                            value={(univSelected)}
                            disabled
                            hidden
                        />
                    </div>
                    <select size="3" className={styles.dropdown} onChange={(e) => handleUniversityClick(e)}>
                        {
                            // eslint-disable-next-line
                            universities.map((university, index) => {
                                return (
                                    <option key={index} value={university.universityID}>{university.name}</option>
                                )
                            })
                        }
                    </select>                
                    <input className={styles.inputText} type="email" id="email" name="email" placeholder={t("email.login")} required></input>
                    <input className={styles.inputText} type="password" id="password" name="password" placeholder={t("password.login")} required></input>
                    <Button type='submit' name={t("register.register")} width='100%' />
                    <Spacer height='36px' />
                    <h4 className={styles.h4}>{t("registeredAlready.register")} <a className={styles.link} href="/login">{t("loginHere.register")}</a></h4>
                    <h4 className={styles.h4}>Don't see your university listed? <a className={styles.link} href="mailto:anw.aardvarkgames@gmail.com">Contact us</a></h4>

                    {
                    toastOpen &&
                    <Toast 
                        title="Registration Attempt Failed"
                        message="Please check to ensure your email is associated with an existing university and your password contains at least 8 characters, 1 special character, and no whitespace." 
                        onclick={() => setToastOpen(false)}
                    />
                    }
                </form>

                <img src={landscapeImage} alt="Landscape" />
            </div>
          </>
    )
};
  
export default Registration;