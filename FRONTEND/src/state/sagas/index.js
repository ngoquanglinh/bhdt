import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import handlerListUserSaga from './usersSaga';
import productSaga from './productSaga';
import categoriesSaga from './categoriesSaga';
import contactsSaga from './contactSaga';
import customersSaga from './customersSaga';
import ordersSaga from './ordersSaga';
import blogsSaga from './blogsSaga';
import brandsSaga from './brandsSaga';
import branchesSaga from './branchesSaga';
import warehousesSaga from './warehousesSaga';


export default function* rootSaga() {
  yield all([
    loginSaga(),
    handlerListUserSaga(),
    productSaga(),
    categoriesSaga(),
    contactsSaga(),
    customersSaga(),
    ordersSaga(),
    blogsSaga(),
    brandsSaga(),
    branchesSaga(),
    warehousesSaga(),
  ]);
}