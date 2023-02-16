import React from "react";
import './navbar.css';
import NavLink from '../navlink/navlink';
import Button from '../button/button';
import logo from '../Aardvark_logo_clear_horizontal.png';

export default function Navbar() {
  return (
    <>
      <nav>
        <a href='/'><img className='logo' src={logo} alt='Aarvark Games Logo'/></a>
        <div className='right-nav'>
          <ul>
              <li id="tournament">
                  <NavLink 
                      name="TOURNAMENT"
                      sublinks={[ 
                        { name: "ABOUT", link: "/tournament" },
                        { name: "SCHEDULE", link: "/schedule" },
                      ]}
                  />
              </li>
              <li id="teamsanduniversities">
                  <NavLink 
                      name="TEAMS & UNIVERSITIES"
                      link="/teamsanduniversities"
                  />
              </li>
              <li id="aardvarkgames">
                  <NavLink 
                      name="AARDVARK GAMES"
                      sublinks={[ 
                        { name: "ABOUT", link: "/aardvarkgames" },
                        { name: "BOARD GAME", link: "/boardgame" },
                      ]}
                  />
              </li>
          </ul>
          <Button name="Login" link="/login"/>
        </div> {/* classname='right-nav' */}
      </nav>
    </>
  );
}