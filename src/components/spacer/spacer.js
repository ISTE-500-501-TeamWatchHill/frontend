import React from "react";

export default function Spacer(props) { 
    const spacerStyle = {
        height: props.height,
     }
    return (
        <>
            <div style={spacerStyle}></div>
        </>
    );
}
