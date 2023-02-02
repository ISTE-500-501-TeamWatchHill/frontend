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
                <a href={props.link}>
                    {props.name}
                </a>
                <div className="dropdown-items">
                    {props.sublinks.map((sublink) => (
                        <a href={sublink.link}>{sublink.name}</a>
                    ))}
                </div>
            </>
        );
    }
}
