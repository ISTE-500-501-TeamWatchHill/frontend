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
                <a href={props.link} class="dropdown">
                    {props.name}
                </a>
                <div class="dropdown-items">
                    {props.sublinks.map((sublink) => (
                        <a href={sublink.link} key={sublink.link}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
