import React from "react";
import Spacer from '../spacer/spacer.js';
import styles from './footer.module.css';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../languageselector/languageselector";

export default function Footer(props) { 
    // const { t, i18n } = useTranslation();
    const { t } = useTranslation();

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.footerLeftBlock}>
                    <h4 className={styles.footerTitle}>A New World</h4>
                    <div className={styles.subcontent}>{t("footerSubtitle.home")}</div>
                    <p>Select your language: <LanguageSelector /></p>
                    <Spacer height='119px' />
                    <div className={styles.subcontent}>&copy; Copyright 2023 · Team Watch Hill</div>
                </div>
                <div className={styles.footerList}>
                    <div className={styles.footerListHeader}>{t("navigation.home")}</div>
                    <div className={styles.footerListItem}><a href='/tournament'>{t("tournamentNav.home")}</a></div>
                    <div className={styles.footerListItem}><a href='/teamsanduniversities'>{t("teamsanduniversitiesNav.home")}</a></div>
                    <div className={styles.footerListItem}><a href='/aardvarkgames'>{t("aardvarkGamesNav.home")}</a></div>
                </div>
            </footer>
        </>
    );
}
