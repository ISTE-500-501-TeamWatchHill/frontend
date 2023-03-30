import React from "react";
import styles from './navbar.module.css';
import { useTranslation } from "react-i18next";
import Cookies from 'universal-cookie';
import { FaCaretDown } from 'react-icons/fa';

export default function Navbar() {
  const { t } = useTranslation();
  const cookies = new Cookies();
  const user = cookies.get('user');
  
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

            {!user && <a href="/login" className={styles.profile}>Login</a>}
            {user && <table className={`${styles.dropdown} ${styles.border}`}>
                  <tbody>
                    <tr>
                      <th>
                        <img src={process.env.PUBLIC_URL + 'profile.png'} className={styles.profilePic} alt="profile"/> 
                        <button className={styles.dropbtn}>
                          {user.firstName}
                          <FaCaretDown />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.dropcontent}>
                      <td><a href="/user">Profile</a></td>
                      <td><a href="/user">Team</a></td>{/* change to be to the user's team page */}
                      <td><a href="/login" onClick={function() {cookies.remove('user');}}>Logout</a></td>
                    </tr>
                  </tbody>
                </table>}
        </div>
      </nav>
    </>
  );
}