import React from "react";
import styles from './toast.module.css';

export default function Toast(props) {

    return (
        <>
            <div className={`${styles.toast} ${styles.animate} ${styles.animate2}`}>
                <div className={styles.titleAndX}>
                    <h4>{props.title ? props.title : ""}</h4>
                    <button className={styles.close} onClick={props.onclick ? props.onclick : {}}>x</button>
                </div>
                <p>{props.message ? props.message : ""}</p>
            </div>
        </>
    )
}