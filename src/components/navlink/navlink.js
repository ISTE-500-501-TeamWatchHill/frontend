import React, { useState } from 'react';
import './navlink.css';

export default function NavLink(props) { 
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = (e) => {
        setShow(false);
    }

    // check props.name exists
    // check props.link || props.sublinks exists
    if (props.link) {
        return (
            <>
                <a href={props.link}>
                    {props.name}
                </a>
            </>
        );
    }

    if (props.sublinks) {
        return (
            <>
                <a href={props.link} class="dropdown">
                    {props.name}
                </a>
                <div className="dropdown-items">
                    {props.sublinks.map((sublink) => (
                        <a href={sublink.link} key={sublink.link}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
