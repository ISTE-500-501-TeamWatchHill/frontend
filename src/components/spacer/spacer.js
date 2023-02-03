import React from "react";

export default function Spacer(props) { 
    const spacerStyle = {
        height: props.height || 0,
        width: props.width || 0,
    }
    return (
        <>
            <div style={spacerStyle}></div>
        </>
    );
}
