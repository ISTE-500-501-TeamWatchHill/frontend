import React from "react";
import Spacer from '../spacer/spacer.js';
import styles from './footer.module.css';

export default function Footer(props) { 
    return (
        <>
            <hr/>
            <footer className={styles.footer}>
                <div className={styles.footerLeftBlock}>
                    <h4 className={styles.footerTitle}>A New World</h4>
                    <div className={styles.subcontent}>Aardvark Game's newest board game adventure!</div>
                    <Spacer height='119px' />
                    <div className={styles.subcontent}>&copy; Copyright 2023 · Team Watch Hill</div>
                </div>
                <div className={styles.footerList}>
                    <div className={styles.footerListHeader}>NAVIGATION</div>
                    <div className={styles.footerListItem}><a href='/tournament'>TOURNAMENT</a></div>
                    <div className={styles.footerListItem}><a href='/teamsanduniversities'>TEAMS & UNIVERSITIES</a></div>
                    <div className={styles.footerListItem}><a href='/aardvarkgames'>AARDVARK GAMES</a></div>
                </div>
            </footer>
        </>
    );
}
