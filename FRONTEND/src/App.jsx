import React, { useEffect, Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-circular-progressbar/dist/styles.css';
import GlobalLoading from './components/GlobalLoading'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import 'antd/dist/antd.css';
import 'swiper/swiper.scss';
import './App.css';
import './App.scss';

import Layout from "./container/layout/Admin";
import LayoutPage from "./container/layout/Home";

export default class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <Route component={Layout} />
                    <Route component={LayoutPage} />
                </Router>
                <GlobalLoading />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </React.Fragment>
        );
    }
}
