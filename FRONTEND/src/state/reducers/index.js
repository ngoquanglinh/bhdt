import { combineReducers } from 'redux';
import { REHYDRATE, PURGE, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user';
// import dataUsersReducer from './dataUser';
import dataRecruitment from './recruitment';
import dataUserRec from './dataUserRec';
import productReducer from './products';
import categoriesReducer from './categories';
import cartReducer from './cart';
import contactReducer from './contact';
import customersReducer from './customers';
import ordersReducer from './orders';
import loginsReducer from './login';
import blogsReducer from './blogs';
import uiReducer from './ui';
import appReducer from './app';
import brandReducer from './brand';
import slideReducer from './slide';
import branchReducer from './branch';
import warehouseReducer from './warehouse';

const config = {
  key: 'lucifer',
  blacklist: [],
  storage
};

const rootReducer = combineReducers({
  infoUser: userReducer,
  // listUser: dataUsersReducer,
  listRecruitment: dataRecruitment,
  listUserSeedRec: dataUserRec,
  products: productReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  contacts: contactReducer,
  customers: customersReducer,
  orders: ordersReducer,
  login: loginsReducer,
  blogs: blogsReducer,
  ui: uiReducer,
  app: appReducer,
  brands: brandReducer,
  slide: slideReducer,
  branches: branchReducer,
  warehouses: warehouseReducer
});

export default persistReducer(config, rootReducer);