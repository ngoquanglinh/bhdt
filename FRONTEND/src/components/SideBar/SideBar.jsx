// import React, { Fragment } from 'react'
// import { Link } from 'react-router-dom';
// import './SideBar.scss'
// import { useDispatch, useSelector } from 'react-redux';
// import { toogleMenu } from './../../state/actions';
// function SideBar() {
//     const dispatch = useDispatch();
//     const toggle = useSelector(state => state.app.toogleMenu);

//     const handleMenu = () => {
//         dispatch(toogleMenu());
//     }
//     return (
//         <Fragment>
//             <nav className={`sidebar ${!toggle && "sidebar-hide"}`}>
//                 <div className="sidebar-header">
//                     <Link to="/admin/dashboard" className="nav-link" className="sidebar-brand">
//                         HONO
//                     </Link>
//                     <div className={`sidebar-toggler`} onClick={handleMenu}>
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                     </div>
//                 </div>
//                 <div className="sidebar-body">
//                     <ul className={`nav`}>
//                         <li className="nav-item ">
//                             <Link to="/admin/dashboard" className="nav-link">
//                                 <i className="fas fa-home"></i>
//                                 <span className="link-title">Tổng quan</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item position-relative">
//                             <i className="fas fa-atlas"></i>
//                             <span className="link-title" style={{ marginLeft: 30 }}>Báo cáo</span>
//                             <ul>
//                                 <li style={{ marginLeft: 40 }}>
//                                     <Link to="/admin/report/revenue" className="nav-link-child no-hover" >
//                                         Doanh thu
//                                     </Link>
//                                 </li>
//                                 <li style={{ marginLeft: 40 }}>
//                                     <Link to="/admin/report/customer" className="nav-link-child no-hover">
//                                         Khách hàng
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/categories" className="nav-link">
//                                 <i className="far fa-list-alt"></i>
//                                 <span className="link-title">Danh mục</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/products-admin" className="nav-link">
//                                 <i className="fas fa-database"></i>
//                                 <span className="link-title">Sản phẩm</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/sizes" className="nav-link">
//                                 <i className="fas fa-crop-alt"></i>
//                                 <span className="link-title">Kích thước</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/colors" className="nav-link">
//                                 <i className="fas fa-tint"></i>
//                                 <span className="link-title">Màu sắc</span>
//                             </Link>
//                         </li>

//                         <li className="nav-item ">
//                             <Link to="/admin/customers" className="nav-link">
//                                 <i className="fas fa-user-friends"></i>
//                                 <span className="link-title">Khách hàng</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/orders" className="nav-link">
//                                 <i className="fas fa-truck"></i>
//                                 <span className="link-title">Đơn hàng</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/blogs" className="nav-link">
//                                 <i className="far fa-newspaper"></i>
//                                 <span className="link-title">Tin tức</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/contacts" className="nav-link">
//                                 <i className="far fa-envelope"></i>
//                                 <span className="link-title">Liên hệ</span>
//                             </Link>
//                         </li>
//                         <li className="nav-item ">
//                             <Link to="/admin/profile" className="nav-link">
//                                 <i className="fas fa-user-cog"></i>
//                                 <span className="link-title">Tài khoản</span>
//                             </Link>
//                         </li>
//                     </ul>
//                 </div>
//             </nav>
//         </Fragment>
//     )
// }

// export default SideBar
import React from 'react'

export default function SideBar() {
    return (
        <div>

        </div>
    )
}
