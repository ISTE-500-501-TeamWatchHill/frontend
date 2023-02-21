import React from "react";
import styles from './button.module.css';

// TODO: Handle icons in buttons? (like on logged in profile page)
// name: String                     -- string included within the button
// width: Int                       -- width of button (subtract width of word and 34px of padding)
// transparentBackground: Boolean   -- background of button is clear
export default function Button(props) {
    var link = "";

    
    if (!props.name) {
        throw new Error ("ERROR: No name provided for button component.");
    }

    if (props.link) {
        link = props.link;
    }

    // styles passed in with the props
    let propStyles = {};

    // width={'150px'} OR width={'50%'} OR ...
    if (props.width) {
        // set width dynamically if passed in
        propStyles.width = props.width;
    } else {
        // else set default padding
        propStyles.padding = `12px 17px`;
    }

    // transparentBackground={true}
    if (props.transparentBackground) {
        // set background to transparent and change color of text
        propStyles.backgroundColor = `transparent`;
        propStyles.color = `#525252`;
        propStyles.border = `1px solid #525252`;
    }

    return (
        <>
            <a href={link}>
                <button className={styles.button} style={propStyles}>
                    {props.name}
                </button>
            </a>
        </>
    )
}