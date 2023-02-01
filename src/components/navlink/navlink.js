
// TODO: Add conditional dropdown navlinks

export default function NavLink(props) { 
    return (
        <>
            <a href={props.link}>
                {props.name}
            </a>
        </>
    )
}
