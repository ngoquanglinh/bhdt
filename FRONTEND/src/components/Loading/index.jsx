import React from "react";
import LoadingGif from './../../assets/images/loading/global-loading.gif';


const Loading = (props) => {
    const { isOpenLoading, center } = props;
    let classWrap = 'loading-wrapper d-flex';
    if (center) classWrap += ' justify-content-center align-items-center'

    return isOpenLoading ? (
        <div className={classWrap}>
            <div className="loading-box">
                <img className="loading__image" src={LoadingGif} alt="" />
            </div>
        </div>
    ) : null;
}

Loading.defaultProps = {
    isOpenLoading: false,
}


export default Loading;
