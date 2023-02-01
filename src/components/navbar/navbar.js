// TODO for Alexis

import React from "react";
import './navbar.css';
import NavLink from '../navlink/navlink';


// Here, we display our Navbar
export default function Navbar() {
  return (
    <>
      <nav>
        <ul>
            <li>
                <NavLink 
                    name="TOURNAMENT"
                    link="/tournament"
                    subnames={[ ]}
                    linksubnames={[ ]}
                />
            </li>
            <li>
                <NavLink 
                    name="TEAMS & UNIVERSITIES"
                    link="/teamsanduniversities"
                    subnames={[ ]}
                    linksubnames={[ ]}
                />
            </li>
            <li>
                <NavLink 
                    name="AARDVARK GAMES"
                    link="/aardvarkgames"
                    subnames={[ ]}
                    linksubnames={[ ]}
                />
            </li>
            <li><button>LOGIN</button></li>
        </ul>
      </nav>
    </>
  );
}