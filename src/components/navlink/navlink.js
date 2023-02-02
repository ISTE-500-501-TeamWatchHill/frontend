import './navlink.css';

export default function NavLink(props) { 
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
                <div class="dropdown-items">
                    {props.sublinks.map((sublink) => (
                        <a href={sublink.link} key={sublink.link}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
