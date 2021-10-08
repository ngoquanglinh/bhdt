import React, { Fragment } from 'react'
import './CustomBoxes.scss';
import { Link, useHistory } from 'react-router-dom';

function CustomBoxes() {
    return (
        <Fragment>
            <div className="custom-boxes">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="fashion-store">
                                <Link to="/products">
                                    <h3>
                                        ZORKA<br />
                                        FASHION<br />
                                        STORE
                                    </h3>
                                    <div className="overlay" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="day-off">
                                <Link to="/products">
                                    <div className="media">
                                        <div className="media-left">
                                            <i className="pe-7s-anchor" />
                                        </div>
                                        <div className="media-body">
                                            <h3>50% OFF</h3>
                                            <h5>EVERY TUESDAY</h5>
                                        </div>
                                    </div>
                                    <div className="overlay" />
                                </Link  >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /.custom-boxes */}
        </Fragment>
    )
}
export default CustomBoxes;