import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from './../../hook/useAuth'
import usePopup from './../../hook/usePopup'
import Popup from './../Popup1/Popup'
import * as sly from './Navbar.styled'
import { userLogoutPage } from './../../state/actions';
import { path } from './../../constant/path';

export default function Navbar() {
  const Authted = useAuth()
  const profile = useSelector(state => state.login.user)
  const { activePopup, showPopup, hidePopup } = usePopup()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogoutPage())
  }

  return (
    <sly.Navbar>
      <small className="mr-auto" style={{ color: "white" }} >
        điện thoại: 0969987654 (0982654321)
      </small>
      <sly.NavMenu>
        {Authted && (
          <div>
            <sly.user onMouseEnter={showPopup} onMouseLeave={hidePopup}>
              <sly.userImg src={profile.profile?.avatar || "https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-doc-ma-chat_115941581.jpg"}></sly.userImg>
              <sly.userName>
                <div>
                  {profile.username || profile.email}
                </div>
              </sly.userName>
              <Popup active={activePopup}>
                <sly.userLink to={path.user}>Tài khoản</sly.userLink>
                <sly.userLink to={path.purchase}>Đơn mua</sly.userLink>
                <sly.userButton>
                  <Link onClick={handleLogout} to={path.login}>
                    Đăng xuất
                  </Link>
                </sly.userButton>
              </Popup>
            </sly.user>
          </div>
        )}
        {!Authted && (
          <div className="d-flex ">
            <li style={{ listStyle: "none" }} >
              <sly.navLink to={path.register}>Đăng Ký</sly.navLink>
            </li>
            <li style={{ listStyle: "none" }}>
              <sly.navLink to={path.login}>Đăng Nhập</sly.navLink>
            </li>
          </div>
        )}
      </sly.NavMenu>
    </sly.Navbar>
  )
}
