import React from "react";
import styles from './navbar.module.css';
import { useTranslation } from "react-i18next";
import { FaCaretDown } from 'react-icons/fa';

export default function Navbar() {
  const { t } = useTranslation();
  
  return (
    <>
      <nav>
        <a href="/" className={styles.left}><strong>A NEW WORLD</strong></a>

        <div className={styles.right}>
            <div className={styles.links}>
                <table className={`${styles.dropdown} ${styles.border}`}>
                  <tbody>
                    <tr>
                      <th>
                        <button className={styles.dropbtn}>
                          {t("tournamentNav.label")}
                          <FaCaretDown />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.dropcontent}>
                      <td><a href="/tournament">{t("tournamentAboutNav.label")}</a></td>
                      <td><a href="/schedule">{t("tournamentScheduleNav.label")}</a></td>
                    </tr>
                    </tbody>
                  </table>

                <a className={styles.link} href="/teamsanduniversities">{t("teamsanduniversitiesNav.label")}</a>

                <table className={`${styles.dropdown} ${styles.border}`}>
                  <tbody>
                    <tr>
                      <th>
                        <button className={styles.dropbtn}>
                          {t("aardvarkGamesNav.label")}
                          <FaCaretDown />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.dropcontent}>
                      <td><a href="/aardvarkgames">{t("aardvarkGamesAboutNav.label")}</a></td>
                      <td><a href="/boardgame">{t("aardvarkGamesBoardGameNav.label")}</a></td>
                    </tr>
                    </tbody>
                  </table>
            </div>

            <a href="/login" className={styles.profile}>Login</a>
        </div>
      </nav>
    </>
  );
}