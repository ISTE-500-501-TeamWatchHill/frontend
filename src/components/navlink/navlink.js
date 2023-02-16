import React from "react";
import './navlink.css';

export default function NavLink(props) { 
    if (!props.name) {
        throw new Error ("ERROR: No name provided for navlink component.");
    }

    if (!props.link && !props.sublinks) {
        throw new Error ("ERROR: No link or sublinks provided for navlink component.");
    }

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
                <a href={props.link} className="dropdown">
                    {props.name}
                </a>
                <div className="dropdown-items">
                    {props.sublinks.map((sublink) => (
                        <a href={sublink.link} key={sublink.link} id={sublink.link.substring(1).concat("_sub")}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
