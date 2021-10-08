import React from 'react'
import Image from './product-empty.png';
import { Image as ImageAntd } from 'antd';

export default function ImageProduct(props) {

    function handleEror(event) {
        event.target.src = Image
    }

    return (
        <ImageAntd
            style={{ width: props.width, height: props.height }}
            src={props.src}
            className={props.className}
            onError={handleEror}
        />
    )
}
