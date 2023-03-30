import React, {useState, useEffect} from 'react'
import styles from './popup.module.css';

import Button from '../button/button';

export default function Popup(props) {

    return (
        <>
            {
                props.show && 

                <div>
                    <p>Testing</p>
                    <Button 
                        name="Close"
                        onClick={props.onClick}>
                    </Button>
                    <p>{props.data.description}</p>
                </div>
            }
            
        </>
    )
}