import React, { Fragment } from 'react'
import './Feature.scss';
function Feature() {
    return (
        <Fragment>
            <div className="features mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="sale">
                                <a href="javascript:void(0)">
                                    <div className="text-box">
                                        FREE SHIPPING WORLDWIDE
                                    </div>
                                    <div className="icon-box">
                                        <i className="pe-7s-cart" />
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="giveway">
                                <a href="javascript:void(0)">
                                    <div className="text-box">
                                        GIVEAWAY EVERYWEEK
                                    </div>
                                    <div className="icon-box">
                                        <i className="pe-7s-gift" />
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="freeship">
                                <a href="javascript:void(0)">
                                    <div className="text-box">
                                        SALE UP TO 70% OFF ON TUESDAY
                                    </div>
                                    <div className="icon-box">
                                        <i className="pe-7s-diamond" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /.features */}
        </Fragment>
    )
}

export default Feature;