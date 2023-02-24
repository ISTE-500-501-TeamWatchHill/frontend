import React from "react";
import Spacer from '../spacer/spacer.js';
import styles from './footer.module.css';
import { useTranslation } from "react-i18next";

export default function Footer(props) { 
    const { t, i18n } = useTranslation();

    return (
        <>
            <hr className={styles.hr}/>
            <footer className={styles.footer}>
                <div className={styles.footerLeftBlock}>
                    <h4 className={styles.footerTitle}>A New World</h4>
                    <div className={styles.subcontent}>{t("footerSubtitle.label")}</div>
                    <Spacer height='119px' />
                    <div className={styles.subcontent}>&copy; Copyright 2023 · Team Watch Hill</div>
                </div>
                <div className={styles.footerList}>
                    <div className={styles.footerListHeader}>{t("navigation.label")}</div>
                    <div className={styles.footerListItem}><a href='/tournament'>{t("tournamentNav.label")}</a></div>
                    <div className={styles.footerListItem}><a href='/teamsanduniversities'>{t("teamsanduniversitiesNav.label")}</a></div>
                    <div className={styles.footerListItem}><a href='/aardvarkgames'>{t("aardvarkGamesNav.label")}</a></div>
                </div>
            </footer>
        </>
    );
}
