import React from "react";

export default function Spacer(props) { 
    const style = "height:" + props.height;
    return (
        <>
            <div style={{style}}></div>
        </>
    );
}
