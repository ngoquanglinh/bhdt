import React, { Component, useEffect, Fragment } from 'react';
import routerPage from './../../../routerPage';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { path } from './../../../constant/path';
import Footer from './components/Footer/index.jsx';
import Header from './components/Header/index.jsx';
import { getAcount } from './../../../state/actions';

export default function Layout() {
    const user = useSelector(state => state.login.user);
    const login = useSelector(state => state.login.login);
    const routes = Object.values(routerPage);
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        if (!user || !login) {
        } else {
            dispatch(getAcount(user.id))
        }
    }, [login]);

    const renderPage = ({ main, noLayout }, routeProps) => {

        main = React.createElement(main, { ...routeProps });
        const { location, match, history } = routeProps;
        if (noLayout) {
            return (
                <React.Fragment>
                    <main>
                        {main}
                    </main>
                    <footer>
                        <Footer />
                    </footer>
                </React.Fragment>
            )
        }
        return (
            <div className="wrapper">
                <div >
                    <Header />
                </div>
                <main>
                    {main}
                </main>
                <footer>
                    <Footer />
                </footer>
            </div>
        )
    }
    return (
        <React.Fragment>
            <Switch>
                {
                    routes.map(({ path, exact, ...layoutProps }) => (
                        <Route key={path} path={path} exact={exact}
                            render={props => renderPage(layoutProps, props)} />
                    ))
                }
            </Switch>
        </React.Fragment>
    )

}

