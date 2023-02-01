// TODO: Buttons should have
    // name: String
    // width: Int -- width of button
    // ...?

import './button.css';

export default function Button(props) { 
    return (
        <>
            <button>
                {props.name}
            </button>
        </>
    )
}