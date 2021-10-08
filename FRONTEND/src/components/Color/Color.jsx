import React, { useRef, useEffect } from 'react'
import { SketchPicker } from 'react-color';

function Color(props) {
    const colorRef = useRef(null);

    useEffect(() => {
        let mounted = true;
        document.querySelector('body').addEventListener("click", handleClick);

        return () => {
            mounted = false;
            document.querySelector('body').removeEventListener("click", handleClick);
        };
    }, [])

    const handleClick = (e) => {
        if (colorRef.current && !colorRef.current.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            props.setshowColor(false);
        }
    }
    const onChangeColor = (v) => {
        props.onChange(v);
    }
    return (
        <div ref={colorRef} >
            <SketchPicker
                className="ml-2"
                color={props.color}
                onChangeComplete={onChangeColor}
            />
        </div>
    )
}

export default Color