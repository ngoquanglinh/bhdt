import {
    Layout, Menu, Avatar,
    Dropdown, AutoComplete, Input, Affix
} from 'antd';
import React, { useState, useEffect } from 'react';
import {
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getAcount } from './../../../../../state/actions';
import { Link, useHistory } from 'react-router-dom';
// import { userLogout } from '../../../../store/actions/User';
import { useSelector } from 'react-redux';
// import { startActionWithPromise } from './../../../../helpers/saga-promise-helpers';
import { userLogoutPage } from "./../../../../../state/actions/login.action";

export default function Header(props) {

    const dispatch = useDispatch()
    const history = useHistory();
    const account = useSelector(state => state.login.user);
    const login = useSelector(state => state.login.login);
    const { Header } = Layout;
    const [top] = useState(0);

    useEffect(() => {
        if (!account || !login) {
            history.push('/admin/login')
        } else {
            // dispatch(getAcount(account.id));
        }
    }, [account, login]);

    const toogleSidebar = () => {
        if (props.setToogleSidebar) {
            props.setToogleSidebar();
        }
    }

    const renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    });
    const renderTitle = (title) => (
        <span>
            {title}
            <a
                style={{
                    float: 'right',
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >

            </a>
        </span>
    );

    const options = [
        {
            label: renderTitle('Libraries'),
            options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
        },
        {
            label: renderTitle('Solutions'),
            options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
        },
        {
            label: renderTitle('Articles'),
            options: [renderItem('AntDesign design language', 100000)],
        },
    ];

    const handleLogout = () => {
        dispatch(userLogoutPage());
        history.push('/admin/login');
    }

    const menu = (
        <Menu style={{ width: 220 }}>
            <Menu.Item key="0" >
                <Link to="/admin/profile">Hồ sơ</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={handleLogout}>Đăng xuất</Menu.Item>
        </Menu>
    );

    return (
        <Affix offsetTop={top}>
            <Header className="site-layout-background custom-head"
                style={{ padding: 0 }}>
                {
                    React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuUnfoldOutlined, {
                        className: 'trigger',
                        onClick: toogleSidebar,
                    })
                }
                <Dropdown overlay={menu}
                    className="ml-auto"
                    trigger={['click']}>
                    <Avatar className="custom-icon"
                        style={{
                            backgroundColor: 'pink',
                            textTransform: "uppercase"
                        }}
                    >
                        {account && account.username.charAt(0)}
                    </Avatar>
                </Dropdown>

            </Header>
        </Affix>
    )
}
