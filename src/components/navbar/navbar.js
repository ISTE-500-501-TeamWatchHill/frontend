import React from "react";
import styles from './navbar.module.css';
import NavLink from '../navlink/navlink';
import Button from '../button/button';
import logo from '../Aardvark_logo_clear_horizontal.png';

export default function Navbar() {
  return (
    <>
      <nav className={styles.nav}>
        <a className={styles.nav_a} href='/'><img className={styles.logo} src={logo} alt='Aarvark Games Logo'/></a>
        <div className={styles.right_nav}>
          <ul className={styles.nav_ul}>
              <li className={styles.nav_li}>
                  <NavLink 
                      name="TOURNAMENT"
                      sublinks={[ 
                        { name: "ABOUT", link: "/tournament" },
                        { name: "SCHEDULE", link: "/schedule" },
                      ]}
                  />
              </li>
              <li className={styles.nav_li}>
                  <NavLink 
                      name="TEAMS & UNIVERSITIES"
                      link="/teamsanduniversities"
                  />
              </li>
              <li className={styles.nav_li}>
                  <NavLink 
                      name="AARDVARK GAMES"
                      sublinks={[ 
                        { name: "ABOUT", link: "/aardvarkgames" },
                        { name: "BOARD GAME", link: "/boardgame" },
                      ]}
                  />
              </li>
          </ul>
          <Button name="Login"  link="/login"/>
        </div> {/* classname='right_nav' */}
      </nav>
    </>
  );
}