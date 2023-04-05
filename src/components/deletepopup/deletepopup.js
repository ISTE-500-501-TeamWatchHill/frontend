import React from 'react'
import globalStyles from '../../pages/pages.module.css';
import styles from './deletepopup.module.css';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Button from '../button/button';

export default function DeletePopup(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');
    const navigate = useNavigate();


    async function onSubmit(e) {
        //TODO
    };


    async function onSubmitUniversity(e) {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

         const raw = JSON.stringify({
            "id": props.data._id,
            "token": user.token,
        });

        const requestOptions = {
            method: 'DELETE',
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
                    <h1 className={styles.title}>Delete University</h1>

                    <div className={styles.padding}>
                        <div className={`${styles.inputItem} ${styles.center}`}>
                            <p>Are you sure you want to delete {props.data.name}?</p>
                        </div>

                        <div className={styles.flex}>
                            <Button 
                                name="Close"
                                onClick={props.onClick} 
                                backgroundColor="red"
                            />
                            <Button type='submit' name='Confirm Delete' />
                        </div>
                    </div>
                </form>
            }
            
        </>
    )
}