// TODO for Alexis

import React from "react";
import './navbar.css';
import NavLink from '../navlink/navlink';
import Button from '../button/button';


// Here, we display our Navbar
export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
            <li>
                <NavLink 
                    name="TOURNAMENT"
                    sublinks={[ 
                      { name: "ABOUT", link: "/tournament" },
                      { name: "SCHEDULE", link: "/schedule" },
                    ]}
                />
            </li>
            <li>
                <NavLink 
                    name="TEAMS & UNIVERSITIES"
                    link="/teamsanduniversities"
                />
            </li>
            <li>
                <NavLink 
                    name="AARDVARK GAMES"
                    sublinks={[ 
                      { name: "ABOUT", link: "/aardvarkgames" },
                      { name: "BOARD GAME", link: "/boardgame" },
                    ]}
                />
            </li>
            {/* <li>
              <Button 
                name="Login"
              />
            </li> */}
        </ul>
        <Button name="Login"/>
      </nav>
    </>
  );
}