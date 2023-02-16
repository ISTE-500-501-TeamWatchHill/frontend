import React from "react";
import styles from './navlink.module.css';
import navbarStyles from '../navbar/navbar.module.css';


export default function NavLink(props) { 
    if (!props.name) {
        throw new Error ("ERROR: No name provided for navlink component.");
    }

    if (!props.link && !props.sublinks) {
        throw new Error ("ERROR: No link or sublinks provided for navlink component.");
    }

    if (props.link) {
        return (
            <>
                <a className={navbarStyles.nav_a} href={props.link}>
                    {props.name}
                </a>
            </>
        );
    }

    if (props.sublinks) {
        return (
            <>
                <a href={props.link} className={`${styles.dropdown} ${navbarStyles.nav_a}`}>
                    {props.name}
                </a>
                <div className={styles.dropdown_items}>
                    {props.sublinks.map((sublink) => (
                        <a className={navbarStyles.nav_a} href={sublink.link} key={sublink.link}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
