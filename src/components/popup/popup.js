import React, {useState, useEffect} from 'react'
import styles from './popup.module.css';

import Button from '../button/button';

const initialValues = {
    name: "",
    players: [],
    universityName: ""
};

export default function Popup(props) {
    return (
        <>
            {
                props.show && 

                <div>
                    <p>Testing</p>
                    <Button 
                        name="Close"
                        onClick={props.handleClose}>
                    </Button>
                    <p>{props.data._id}</p>
                </div>
            }
            
        </>
    )
}