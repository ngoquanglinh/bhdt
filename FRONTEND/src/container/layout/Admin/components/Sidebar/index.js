import {
    Layout, Menu, Affix
} from 'antd';
import React, { useState } from 'react';
import {
    Link, useLocation
} from 'react-router-dom';
import menu from "./../../menu";

const { SubMenu } = Menu;

function Sidebar(props) {
    const { Sider } = Layout;
    const [top] = useState(0);
    let location = useLocation()

    const renderMenu = () => {
        return (
            menu.map((item) => {
                if (item.subMenu) {
                    return (
                        <SubMenu key={item.path} icon={item.icon} title={item.title}>
                            {
                                item.subMenu.map((it) => {
                                    return (
                                        <Menu.Item
                                            key={it.path}
                                            icon={it.icon} >
                                            <Link to={it.path}>{it.title}</Link>
                                        </Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={item.path}
                            icon={item.icon} >
                            <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                    )
                }
            })
        )
    }

    return (
        <Affix offsetTop={top}>
            <Sider trigger={null} collapsible collapsed={props.toogleSidebar}>
                <div className="side-layout-children">
                    <div className="text-center">
                        <Link to="/admin/dashboard">
                            <div className="text-center p-2">
                                <span style={{ color: 'white', fontWeight: 600, fontSize: 18 }}>Peaky Blinder</span>
                            </div>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline"
                        inlineCollapsed={props.toogleSidebar}
                        defaultSelectedKeys={['/']}
                        selectedKeys={[location.pathname]}>
                        {
                            renderMenu()
                        }
                    </Menu>
                </div>

            </Sider>

        </Affix >
    )
}
export default Sidebar;
