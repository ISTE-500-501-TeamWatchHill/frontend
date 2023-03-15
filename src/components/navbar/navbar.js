import React from "react";
import globalStyles from '../../pages/pages.module.css';
import styles from './navbar.module.css';
import NavLink from '../navlink/navlink';
import Button from '../button/button';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../languageselector/languageselector";
import Cookies from 'universal-cookie';

export default function Navbar() {
  const { t } = useTranslation();
  const cookies = new Cookies();
  const user = cookies.get('user');

  return (
    <>
      <nav className={styles.nav}>
        <a className={`${globalStyles.logo_text} ${styles.nav_a}`} href='/'>A NEW WORLD</a>
        <div className={styles.right_nav}>
          <ul className={styles.nav_ul}>
              <li className={styles.nav_li} id="tournament">
                  <NavLink 
                      name={t("tournamentNav.label")}
                      sublinks={[ 
                        { name: t("tournamentAboutNav.label"), link: "/tournament" },
                        { name: t("tournamentScheduleNav.label"), link: "/schedule" },
                      ]}
                  />
              </li>

              <li className={styles.nav_li} id="teamsanduniversities">
                  <NavLink 
                      name={t("teamsanduniversitiesNav.label")}
                      link="/teamsanduniversities"
                  />
              </li>

              <li className={styles.nav_li} id="aardvarkgames">
                  <NavLink 
                      name={t("aardvarkGamesNav.label")}
                      sublinks={[ 
                        { name: t("aardvarkGamesAboutNav.label"), link: "/aardvarkgames" },
                        { name: t("aardvarkGamesBoardGameNav.label"), link: "/boardgame" },
                      ]}
                  />
              </li>
          </ul>
          { !user && <Button name={t("loginButton.label")} link="/login"/> }
          { user && <Button name="Logout" link="/login" onClick={function() {cookies.remove('user');}}/> }
          { user && <div>Welcome, { user.firstName }!</div>}
          <LanguageSelector />
        </div> {/* classname='right_nav' */}
      </nav>
    </>
  );
}