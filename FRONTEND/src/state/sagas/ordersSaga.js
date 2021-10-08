import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListOrderSuccess, getDetailOrderSuccess, hideLoading, showLoading } from '../actions';
import OrdersServices from './../../services/orders.services';
import { sagaPromise } from "./../../Helper/saga-promise-helpers";

function* getListOrder(action) {
    yield put(showLoading())
    try {
        const res = yield call(OrdersServices.listOrder, action.payload);
        yield put(getListOrderSuccess(res));
        yield put(hideLoading());
        return res;
    } catch (e) {
        console.log(e);
        yield put(hideLoading());
        return e;
    }

}
function* handlerEditOrder(action) {
    yield put(showLoading())
    const { item } = action.payload;
    try {
        yield call(OrdersServices.editOrder, item);
        const res = yield call(OrdersServices.listOrder, { type: action.payload.type });
        yield put(getListOrderSuccess(res));
        yield toastSuccess('Sửa thành công!');
    } catch (error) {
        yield toastError('Sửa thất bại!');
    }
    yield put(hideLoading());
}

function* handlerRemoveOrder(action) {
    yield put(showLoading())
    try {
        yield call(OrdersServices.removeOrder, action.payload.id)
        const res = yield call(OrdersServices.listOrder, { type: action.payload.type });
        yield put(getListOrderSuccess(res));
        toastSuccess('Xóa thành công!')
    } catch (error) { }
    yield put(hideLoading());
}


function* handlerAddOrder(action) {
    yield put(showLoading())
    try {
        yield call(OrdersServices.addNew, action.payload);
        const res = yield call(OrdersServices.listOrder, { type: action.payload.type });
        yield put(getListOrderSuccess(res));
        toastSuccess('Thêm thành công')
    } catch (error) {
        toastError('Thêm không thành công');
    }
    yield put(hideLoading());
}
function* handlerGetDetailOrder(action) {
    yield put(showLoading())
    try {
        const res = yield call(OrdersServices.getDetailOrder, action.payload);
        yield put(getDetailOrderSuccess(res));
    } catch (e) {
        console.log(e);
    }
    yield put(hideLoading());
}

function* addOrderCheckout(action) {
    yield put(showLoading())
    try {
        const res = yield call(OrdersServices.addNew, action.payload);
        yield put(hideLoading());
        return res;
    } catch (error) {
        yield put(hideLoading());
        return error;
    }
}
export default function* ordersSaga() {
    yield takeLatest(Actions.GET_ALL_ORDER, sagaPromise(getListOrder));
    yield takeLatest(Actions.EDIT_ORDER, handlerEditOrder);
    yield takeLatest(Actions.REMOVE_ORDER, handlerRemoveOrder);
    yield takeLatest(Actions.ADD_ORDER, handlerAddOrder);
    yield takeLatest(Actions.GET_DETAIL_ORDER, handlerGetDetailOrder);
    yield takeLatest(Actions.ADD_ORDER_CHECKOUT, sagaPromise(addOrderCheckout));
}
