import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListBrandsSuccess, hideLoading, showLoading } from '../actions';
import BrandsServices from './../../services/brands.services';
import { sagaPromise } from './../../Helper/saga-promise-helpers';

function* getListBrands(action) {
    yield put(showLoading())
    try {
        const res = yield call(BrandsServices.listBrands, action.payload);
        yield put(getListBrandsSuccess(res));
        yield put(hideLoading());
        return res;
    } catch (e) {
        yield put(hideLoading());
        return e;
    }

}

function* searchListBrands(action) {
    yield put(showLoading())
    try {
        const res = yield call(BrandsServices.searchListBrands, action.payload);
        yield put(getListBrandsSuccess(res));
    } catch (e) {
    }
    yield put(hideLoading());
}

function* addNewBrands(action) {
    yield put(showLoading())
    try {
        yield call(BrandsServices.addNew, action.payload);
        const res = yield call(BrandsServices.listBrands);
        yield put(getListBrandsSuccess(res));
        toastSuccess('Thêm brand thành công')
    } catch (error) {
        toastError('Thêm brand không  thành công');
    }
    yield put(hideLoading());
}

function* editListBrands(action) {
    yield put(showLoading())
    try {
        yield call(BrandsServices.editBrands, action.payload);
        const res = yield call(BrandsServices.listBrands);
        yield put(getListBrandsSuccess(res));
        toastSuccess('Sửa danh mục thành công')
    } catch (error) {
        toastError('Sửa danh mục không thành công');
    }
    yield put(hideLoading());
}

function* deleteBrand(action) {
    yield put(showLoading());
    try {
        yield call(BrandsServices.deleteBrand, action.payload);
        const res = yield call(BrandsServices.listBrands);
        yield put(getListBrandsSuccess(res));
        toastSuccess('Xóa brand thành công')
    } catch (error) {
        toastError('Xóa brand không thành công');
    }
    yield put(hideLoading());
}


export default function* categoriesSaga() {
    yield takeLatest(Actions.GET_LIST_BRANDS, sagaPromise(getListBrands));
    yield takeLatest(Actions.EDIT_BRANDS, editListBrands);
    yield takeLatest(Actions.ADD_NEW_BRAND, addNewBrands);
    yield takeLatest(Actions.DELETE_BRAND, deleteBrand);
    yield takeLatest(Actions.SEARCH_LIST_BRANDS, searchListBrands);
}
