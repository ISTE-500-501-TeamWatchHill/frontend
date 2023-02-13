import React from "react";
import logo from '../Aardvark_logo_clear.png';
import styles from './footer.module.css';

export default function Footer(props) { 
    return (
        <>
            <footer className={styles.footer}>
                <a href='/'><img className={styles.logo} src={logo} alt='Aarvark Games Logo'/></a>
                <div className='footerList'>
                    <div className={styles.footerListHeader}>NAVIGATION</div>
                    <div className={styles.footerListItem}><a href='/tournament'>TOURNAMENT</a></div>
                    <div className={styles.footerListItem}><a href='/teamsanduniversities'>TEAMS & UNIVERSITIES</a></div>
                    <div className={styles.footerListItem}><a href='/aardvarkgames'>AARDVARK GAMES</a></div>
                </div>
            </footer>
        </>
    );
}
