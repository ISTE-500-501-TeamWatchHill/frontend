import React from "react";
import styles from './navlink.module.css';
import navbarStyles from '../navbar/navbar.module.css';
import profileImg from '../../assets/images/profile.png';

//TODO: update to be able to set an image dynamically

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

    if (props.sublinks && !props.img) {
        return (
            <>
                <a href={props.link} className={`${styles.dropdown} ${navbarStyles.nav_a}`}>
                    {props.name}
                </a>
                <div className={styles.dropdown_items}>
                    {props.sublinks.map((sublink) => (
                        <a className={navbarStyles.nav_a} href={sublink.link} key={sublink.link} id={sublink.link.substring(1).concat("_sub")}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }

    if (props.sublinks && props.img) {
        let path = `../../assets/images/${props.img}`;
        return (
            <>
                <a href={props.link} className={`${styles.dropdown} ${navbarStyles.nav_a}`}>
                    <img src={profileImg} width="26px" height="26px" /> 
                    {/* <img src={require(path)}/>  */}
                    <span>{props.name}</span>
                </a>
                <div className={styles.dropdown_items}>
                    {props.sublinks.map((sublink) => (
                        <a className={navbarStyles.nav_a} href={sublink.link} key={sublink.link} id={sublink.link.substring(1).concat("_sub")} onClick={sublink.onClick}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
