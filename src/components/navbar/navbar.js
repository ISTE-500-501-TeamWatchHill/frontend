import React from "react";
import styles from './navbar.module.css';
import { useTranslation } from "react-i18next";
import Cookies from 'universal-cookie';
import { FaCaretDown } from 'react-icons/fa';
import Spacer from '../spacer/spacer';


export default function Navbar() {
  const { t } = useTranslation();
  const cookies = new Cookies();
  const user = cookies.get('user');
  
  return (
    <>
      <nav>
        <a href="/" className={styles.left}><strong>A NEW WORLD</strong></a>

        <div className={styles.right}>
            {
              (!user || (user && user.role!==14139)) && 
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

                <table className={`${styles.dropdown} ${styles.border}`}>
                  <tbody>
                    <tr>
                      <th>
                        <button className={styles.dropbtn}>
                        {t("teamsanduniversitiesNav.label")}
                          <FaCaretDown />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.dropcontent}>
                      <td><a href="/teamsanduniversities">FIND A TEAM</a></td>
                      <td><a href="/team/create">CREATE A TEAM</a></td>
                    </tr>
                  </tbody>
                </table>

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
            }

{
              (user && user.role===14139) && 
              <div className={styles.links}>
                <a className={styles.link} href="/managegames">GAMES</a>

                <table className={`${styles.dropdown} ${styles.border}`}>
                  <tbody>
                    <tr>
                      <th>
                        <button className={styles.dropbtn}>
                        {t("teamsanduniversitiesNav.label")}
                          <FaCaretDown />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.dropcontent}>
                      <td><a href="/manageteams">TEAMS</a></td>
                      <td><a href="/manageuniversities">UNIVERSITIES</a></td>
                      <td><a href="/teamsanduniversities">PLAYER VIEW</a></td>
                    </tr>
                  </tbody>
                </table>

                <a className={styles.link} href="/manageusers">USERS</a>
              </div>
            }


            {!user && <a href="/register" className={styles.profile}>Register</a>}
            <Spacer width="16px"/>
            {!user && <a href="/login" className={styles.profile}>Login</a>}
            {user && <table className={`${styles.dropdown} ${styles.border}`}>
                  <tbody>
                    <tr>
                      <th>
                        <button className={styles.dropbtn}>
                          {user.firstName}
                          <FaCaretDown />
                        </button>
                      </th>
                    </tr>
                    <tr className={styles.dropcontent}>
                      <td><a href="/user">Profile</a></td>
                      <td><a href="/login" onClick={function() {cookies.remove('user');}}>Logout</a></td>
                    </tr>
                  </tbody>
                </table>}
        </div>
      </nav>
    </>
  );
}