import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';


function Index({ type, size, icon, text, className, onClick, style, placement, tooltip, children, hotKey }) {
    useEffect(() => {
        const onKeyup = (event) => {
            if (hotKey && (event.code === hotKey || event.code === "NumpadEnter")) {
                if (onClick) {
                    onClick();
                }
            }
        };

        document.addEventListener("keydown", onKeyup);
        return () => {
            document.removeEventListener("keydown", onKeyup);
        };
    }, []);

    if (tooltip) {
        return (
            <Tooltip placement={placement} title={tooltip}>
                <Button
                    style={style}
                    className={className}
                    type={type}
                    size={size}
                    icon={icon || null}
                    onClick={onClick}
                >
                    {text}
                </Button>
            </Tooltip>
        )
    }
    return (
        <Button
            style={style}
            className={className}
            type={type}
            size={size}
            icon={icon || null}
            onClick={onClick}
        >
            {text} {children}
        </Button>
    )
}
Index.propTypes = {
    type: PropTypes.string, // onOf (primary,dashed,text,link,ghost )
    size: PropTypes.string,//large | middle | small
    loading: PropTypes.bool,
    icon: PropTypes.array,
    href: PropTypes.string,
    ghost: PropTypes.bool,
    disabled: PropTypes.bool,
    block: PropTypes.bool,
    danger: PropTypes.bool,
    shape: PropTypes.string, //circle | round
    icon: PropTypes.elementType,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    tooltip: PropTypes.string,
    hotKey: PropTypes.string,
}

Index.defaultProps = {
    type: "primary",
    size: "middle",
    shape: "round",
}
export default Index;