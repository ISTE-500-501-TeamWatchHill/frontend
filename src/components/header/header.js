import React from "react";
import globalStyles from '../../pages/pages.module.css';

export default function Header(props) { 
    if (!props.name) {
        throw new Error ("ERROR: No name provided for header component.");
    }

    return (
        <>
            <div className={globalStyles.h1_title_section}>
                <h1 className={globalStyles.h1_title}>{props.name}</h1>
            </div>
        </>
    );
}
