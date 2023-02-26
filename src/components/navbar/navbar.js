import React from "react";
import styles from './navbar.module.css';
import NavLink from '../navlink/navlink';
import Button from '../button/button';
import logo from '../Aardvark_logo_clear_horizontal.png';
import { useTranslation } from "react-i18next";
import LanguageSelector from "../languageselector/languageselector";

export default function Navbar() {
  // const { t, i18n } = useTranslation();
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user')); // get user from localStorage

  return (
    <>
      <nav className={styles.nav}>
        <a className={styles.nav_a} href='/'><img className={styles.logo} src={logo} alt='Aarvark Games Logo'/></a>
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
          { user && <Button name="Logout" link="/login" onClick={function() {localStorage.removeItem('user');}}/> }
          <LanguageSelector />
        </div> {/* classname='right_nav' */}
      </nav>
    </>
  );
}