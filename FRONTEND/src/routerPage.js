
import Home from './container/Home/Home';
import Register from './container/Authention/Register/Register';
import Login from './container/Authention/Login/Login';
import ProductDetail from './container/ProductDetail1/ProductDetail';
import Cart from './container/Cart1/Cart';
import Checkout from './container/Checkout1/Checkout';
import Purchase from './container/Purchase/Purchase';
import Profile from './container/Profile1/Profile';
import Invoice from './container/Invoice1';

const routesPages = [
    {
        path: '/',
        exact: true,
        main: () => <Home />
    },
    {
        path: '/login',
        exact: false,
        noLayout: true,
        main: () => <Login />
    },
    {
        path: '/register',
        exact: false,
        noLayout: true,
        main: () => <Register />
    },
    {
        path: '/cart',
        exact: false,
        main: () => <Cart />
    },
    {
        path: '/product/:idProduct',
        exact: false,
        main: () => <ProductDetail />
    },
    {
        path: '/checkout',
        exact: false,
        main: () => <Checkout />
    },
    {
        path: '/user/purchase',
        exact: true,
        main: () => <Purchase />
    },
    {
        path: '/user/account/profile',
        exact: false,
        main: () => <Profile />
    },
    {
        path: '/user/purchase/order/:id',
        exact: false,
        main: () => <Invoice />
    },
];

export default routesPages;
