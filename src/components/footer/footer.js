import React from "react";
import logo from '../Aardvark_logo_clear.png';
import './footer.css';

export default function Footer(props) { 
    return (
        <>
            <footer>
                <a href='/'><img className='logo' src={logo} alt='Aarvark Games Logo'/></a>
                <div className='footerList'>
                    <div className='footerListHeader'>NAVIGATION</div>
                    <div className='footerListItem'><a href='/tournament'>TOURNAMENT</a></div>
                    <div className='footerListItem'><a href='/teamsanduniversities'>TEAMS & UNIVERSITIES</a></div>
                    <div className='footerListItem'><a href='/aardvarkgames'>AARDVARK GAMES</a></div>
                </div>
            </footer>
        </>
    );
}
