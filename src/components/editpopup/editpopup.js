import React, {useState} from 'react'
// import globalStyles from '../../pages/pages.module.css';
import { useNavigate } from "react-router-dom";
import styles from './editpopup.module.css';
import Cookies from 'universal-cookie';
import Button from '../button/button';

export default function EditPopup(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();
    

    async function onSubmit(e) {
        //TODO
    }

    async function onSubmitUniversity(e) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

         const raw = JSON.stringify({
            "approvalStatus": props.data.approvalStatus,
            "description": e.target.universityDescription.value,
            "domain": e.target.universityDomain.value,
            "logo": props.data.logo,
            "moderatorIDs": props.data.moderatorIDs,
            "name": e.target.universityName.value,
            "universityID": props.data.universityID,
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${BASE_URL}/universitySec`, requestOptions)
            .then(response => response.json())
            .then(function(result) {
                if (result) {
                    navigate("/manageteam");
                    navigate(0);
                }
            })
            .catch(function(error) {
                console.log('error', error);
                alert('Bad! Bad! Did not like that at all >:(');
            }); 
    }

    return (
        <>
            {
                (props.show && props.type==="team") && 

                <form className={styles.form} onSubmit={onSubmit}>
                    {/* ALEXIS TODO */}
                </form>
            }

            {
                (props.show && props.type==="university") && 

                <form className={styles.form} onSubmit={onSubmitUniversity}>
                    <h1 className={styles.title}>Update University</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Name:</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityName" 
                                name="universityName" 
                                placeholder='University Name' 
                                defaultValue={props.data.name} 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Domain:</p>
                            <input 
                                className={styles.inputText} 
                                type="text" 
                                id="universityDomain" 
                                name="universityDomain" 
                                placeholder='University Domain' 
                                defaultValue={props.data.domain} 
                                required 
                            />
                        </div>

                        <div className={`${styles.inputItemBox}`}>
                            <p>Description:</p>
                            <textarea 
                                className={styles.textArea} 
                                type="text" 
                                id="universityDescription" 
                                name="universityDescription" 
                                placeholder='University Description' 
                                defaultValue={props.data.description} 
                                required 
                            />
                        </div>

                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button 
                                type='submit'
                                name='Update Team' 
                            />
                        </div>
                    </div>
                </form>
            }
            
        </>
    )
}