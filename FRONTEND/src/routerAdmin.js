import React from 'react';
import Dashboard from './container/Admin/index.jsx';
import ProductAdmin from './container/ProductAdmin/ProductAdmin';
import SizeAdmin from './container/ProductAdmin/SizeAdmin';
import ColorAdmin from './container/ProductAdmin/ColorAdmin';
import ContactAdmin from './container/ContactAdmin/ContactAdmin';
import CustomersAdmin from './container/CustomersAdmin/CustomersAdmin';
import CatetgoriesAdmin from './container/CatetgoriesAdmin/CatetgoriesAdmin';
import OrderAdmin from './container/OrdersAdmin/OrdersAdmin';
import Login from './container/Login/Login';
import BlogsAdmin from './container/BlogAdmin/BlogAdmin';
import ProfileAdmin from './container/ProfileAdmin/ProfileAdmin';
const ReportCustomer = React.lazy(() => import('./container/ReportAdmin/ReportCustomer'));
const ReportRevenue = React.lazy(() => import('./container/ReportAdmin/ReportRevenue'));
const Brands = React.lazy(() => import('./container/BrandsAdmin/BrandsAdmin'));
const Branch = React.lazy(() => import('./container/Branch'));
const Warehouse = React.lazy(() => import('./container/Warehouse'));
const Invoice = React.lazy(() => import('./container/Invoice'));
const routesAdmin = [
    {
        path: '/admin/login',
        exact: false,
        noLayout: true,
        main: () => <Login />
    },
    {
        path: '/admin/dashboard',
        exact: false,
        main: () => <Dashboard />
    },
    {
        path: '/admin/report/customer',
        exact: false,
        main: () => <ReportCustomer />
    },
    {
        path: '/admin/report/revenue',
        exact: false,
        main: () => <ReportRevenue />
    },
    {
        path: '/admin/sizes',
        exact: false,
        main: () => <SizeAdmin />
    },
    {
        path: '/admin/colors',
        exact: false,
        main: () => <ColorAdmin />
    },
    {
        path: '/admin/contacts',
        exact: false,
        main: () => <ContactAdmin />
    },
    {
        path: '/admin/products-admin',
        exact: false,
        main: () => <ProductAdmin />
    },
    {
        path: '/admin/categories',
        exact: false,
        main: () => <CatetgoriesAdmin />
    },
    {
        path: '/admin/customers',
        exact: false,
        main: () => <CustomersAdmin />
    },
    {
        path: '/admin/orders',
        exact: false,
        main: () => <OrderAdmin />
    },
    {
        path: '/admin/blogs',
        exact: false,
        main: () => <BlogsAdmin />
    },
    {
        path: '/admin/profile',
        exact: false,
        main: () => <ProfileAdmin />
    },
    {
        path: '/admin/brands',
        exact: false,
        main: () => <Brands />
    },
    {
        path: '/admin/branch',
        exact: false,
        main: () => <Branch />
    },
    {
        path: '/admin/warehouse',
        exact: false,
        main: () => <Warehouse />
    },
    {
        path: '/admin/products-import',
        exact: false,
        main: () => <Invoice />
    },
    {
        path: '/admin/products-export',
        exact: false,
        main: () => <Invoice />
    },

];

export default routesAdmin;
