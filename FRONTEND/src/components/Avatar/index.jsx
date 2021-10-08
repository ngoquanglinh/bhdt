import React from 'react';

export default function Avatar(props) {
    const size = props.size || 40;
    const styleImg = {
        ...props.style,
        background: "#e1dada",
        width: size,
        height: size,
        borderRadius: "50%",
        cursor: "pointer",
        overflow: "hidden"
    }
    if (props.url) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ ...styleImg }}>
                <span>
                    <img src={props.url} style={{ width: "100%", height: "100%" }} />
                </span>
            </div>
        )
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ ...styleImg }}>
            <span className="text-uppercase">
                {(props.name || "").charAt(0)}
            </span>
        </div>
    )
}
