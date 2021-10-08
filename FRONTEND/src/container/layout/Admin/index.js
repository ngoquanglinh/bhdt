import React, { useState, Fragment, useEffect, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from 'react-router-dom';
import {
    Layout
} from 'antd';
import routesAdmin from './../../../routerAdmin';
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/Sidebar";
import { useDispatch, useSelector, } from 'react-redux';
import { getListWarehouses, getListBranches } from '../../../state/actions';

function AdminLayout() {

    const history = useHistory();
    const dispatch = useDispatch();
    const login = true;
    const [model, setModel] = useState({
        page: 1,
        pageSize: 20,
        search: ""
    });
    useEffect(() => {
        dispatch(getListWarehouses(model))
        dispatch(getListBranches(model))
    }, []);

    const { Content } = Layout;
    const routes = Object.values(routesAdmin);
    const [collapsed, setCollapsed] = useState(false);

    const setToogleSidebar = () => {
        setCollapsed(!collapsed);
    }

    const renderPage = ({ main, noLayout }, routeProps) => {
        main = React.createElement(main, { ...routeProps });
        // const { location, match, history } = routeProps;
        if (noLayout) {
            return (
                <Fragment>
                    {main}
                </Fragment>
            )
        }
        return (
            <div className="App">
                <Layout style={{ minHeight: '100vh' }}>
                    <SideBar
                        toogleSidebar={collapsed}
                    />
                    <Layout Layout className="site-layout" >
                        <Header
                            setToogleSidebar={setToogleSidebar}
                            collapsed={collapsed}
                        />
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: "100vh",
                                background: "#ececec"
                            }}
                        >
                            {main}
                        </Content>
                        <Footer />
                    </Layout >
                </Layout >
            </div >
        )
    }
    return (
        <Suspense fallback={false}>
            <Switch>
                {
                    routes.map(({ path, exact, ...layoutProps }) => (
                        <Route key={path} path={path} exact={exact}
                            render={props => renderPage(layoutProps, props)} />
                    ))
                }
            </Switch>
        </Suspense>
    )
}
export default AdminLayout;