import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListCustomerSuccess, hideLoading, showLoading } from '../actions';
import CustomersServices from './../../services/customers.services';

function* getListCustomer(action) {
    yield put(showLoading())
    try {
        const res = yield call(CustomersServices.listCustomer, action.payload);
        yield put(getListCustomerSuccess(res));
    } catch (e) {
        console.log(e);
    }
    yield put(hideLoading());
}
function* handlerEditCustomer(action) {
    yield put(showLoading())
    try {
        yield call(CustomersServices.editCustomer, action.payload);
        const res = yield call(CustomersServices.listCustomer, {});
        yield put(getListCustomerSuccess(res));
        yield toastSuccess('Sửa khách hàng thành công!');
    } catch (error) {
        yield toastError('Sửa khách hàng thất bại!');
    }
    yield put(hideLoading());
}

function* handlerRemoveCustomer(action) {
    yield put(showLoading())
    try {
        yield call(CustomersServices.removeCustomer, action.payload)
        const res = yield call(CustomersServices.listCustomer, {});
        yield put(getListCustomerSuccess(res));
        toastSuccess('Xóa khách hàng thành công!')
    } catch (error) { }
    yield put(hideLoading());
}


function* handlerAddCustomer(action) {
    yield put(showLoading())
    try {
        yield call(CustomersServices.addNew, action.payload);
        const res = yield call(CustomersServices.listCustomer, {});
        yield put(getListCustomerSuccess(res));
        toastSuccess('Thêm khách hàng thành công')
    } catch (error) {
        toastError('Thêm khách hàng không thành công');
    }
    yield put(hideLoading());

}
export default function* customersSaga() {
    yield takeLatest(Actions.GET_ALL_CUSTOMER, getListCustomer);
    yield takeLatest(Actions.EDIT_CUSTOMER, handlerEditCustomer);
    yield takeLatest(Actions.REMOVE_CUSTOMER, handlerRemoveCustomer);
    yield takeLatest(Actions.ADD_CUSTOMER, handlerAddCustomer);
}
