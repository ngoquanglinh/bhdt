import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListWarehousesSuccess, hideLoading, showLoading } from '../actions';
import WarehousesServices from './../../services/warehouses.services';
import { sagaPromise } from './../../Helper/saga-promise-helpers';

function* getListWarehouses(action) {
    yield put(showLoading())
    try {
        const res = yield call(WarehousesServices.listWarehouses, action.payload);
        yield put(getListWarehousesSuccess(res));
        yield put(hideLoading());
        return res;
    } catch (e) {
        yield put(hideLoading());
        return e;
    }

}

function* searchListWarehouses(action) {
    yield put(showLoading())
    try {
        const res = yield call(WarehousesServices.searchListWarehouses, action.payload);
        yield put(getListWarehousesSuccess(res));
    } catch (e) {
    }
    yield put(hideLoading());
}

function* addNewWarehouses(action) {
    yield put(showLoading())
    try {
        yield call(WarehousesServices.addNew, action.payload);
        const res = yield call(WarehousesServices.listWarehouses);
        yield put(getListWarehousesSuccess(res));
        toastSuccess('Thêm kho thành công')
    } catch (error) {
        toastError('Thêm kho không  thành công');
    }
    yield put(hideLoading());
}

function* editListWarehouses(action) {
    yield put(showLoading())
    try {
        yield call(WarehousesServices.editWarehouses, action.payload);
        const res = yield call(WarehousesServices.listWarehouses);
        yield put(getListWarehousesSuccess(res));
        toastSuccess('Sửa kho thành công')
    } catch (error) {
        toastError('Sửa kho không thành công');
    }
    yield put(hideLoading());
}

function* deleteBranch(action) {
    yield put(showLoading());
    try {
        yield call(WarehousesServices.deleteBranch, action.payload);
        const res = yield call(WarehousesServices.listWarehouses);
        yield put(getListWarehousesSuccess(res));
        toastSuccess('Xóa kho thành công')
    } catch (error) {
        toastError('Xóa kho không thành công');
    }
    yield put(hideLoading());
}


export default function* categoriesSaga() {
    yield takeLatest(Actions.GET_LIST_WAREHOUSES, sagaPromise(getListWarehouses));
    yield takeLatest(Actions.EDIT_WAREHOUSE, editListWarehouses);
    yield takeLatest(Actions.ADD_NEW_WAREHOUSE, addNewWarehouses);
    yield takeLatest(Actions.DELETE_WAREHOUSE, deleteBranch);
    yield takeLatest(Actions.SEARCH_LIST_WAREHOUSES, searchListWarehouses);
}
