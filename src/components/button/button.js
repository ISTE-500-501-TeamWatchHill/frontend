import React, { useState } from "react";
import styles from './button.module.css';
import _uniqueId from 'lodash/uniqueId';

// TODO: Handle icons in buttons? (like on logged in profile page)
// name: String                     -- string included within the button
// width: Int                       -- width of button (subtract width of word and 34px of padding)
// transparentBackground: Boolean   -- background of button is clear
export default function Button(props) {
    const [uid] = useState(_uniqueId('button-uid-'));
    
    // name
    if (!props.name) {
        throw new Error ("ERROR: No name provided for button component.");
    }

    // width has a default
    if (props.width) {
        // TODO: Set width dynamically
    }

    // background has a default
    if (props.transparentBackground) {
        // Set background to transparent
        console.log(document.getElementsByClassName(uid));
    }

    return (
        <>
            <button className={`${styles.button} ${uid}`}>
                {props.name}
            </button>
        </>
    )
}