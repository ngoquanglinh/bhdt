import React, { useEffect, useRef } from 'react';

export default function Popup({ hide, children, style, minWidth }) {

    const currentRef = useRef();
    useEffect(() => {
        document.querySelector('body').addEventListener("click", handleClick, false);
        return () => {
            document.querySelector('body').removeEventListener("click", handleClick, false);
        }
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentRef.current && !currentRef.current.contains(e.target)) {
            hide();
        }
    };
    const mw = minWidth || 300;
    return (
        <div ref={currentRef} className="card p-5"
            style={{
                ...style, boxShadow: " 0 4px 18px rgb(0 0 0 / 11%)",
                minWidth: mw,
                borderRadius: "4px",
                position: "absolute",
                zIndex: 1000000000000,
            }}
        >
            {children}
        </div >
    )
}
