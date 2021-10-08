import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListBranchesSuccess, hideLoading, showLoading } from '../actions';
import BranchesServices from './../../services/branches.services';
import { sagaPromise } from './../../Helper/saga-promise-helpers';

function* getListBranches(action) {
    yield put(showLoading())
    try {
        const res = yield call(BranchesServices.listBranches, action.payload);
        yield put(getListBranchesSuccess(res));
        yield put(hideLoading());
        return res;
    } catch (e) {
        yield put(hideLoading());
        return e;
    }

}

function* searchListBranches(action) {
    yield put(showLoading())
    try {
        const res = yield call(BranchesServices.searchListBranches, action.payload);
        yield put(getListBranchesSuccess(res));
    } catch (e) {
    }
    yield put(hideLoading());
}

function* addNewBranches(action) {
    yield put(showLoading())
    try {
        yield call(BranchesServices.addNew, action.payload);
        const res = yield call(BranchesServices.listBranches);
        yield put(getListBranchesSuccess(res));
        toastSuccess('Thêm chi nhánh thành công')
    } catch (error) {
        toastError('Thêm chi nhánh không  thành công');
    }
    yield put(hideLoading());
}

function* editListBranches(action) {
    yield put(showLoading())
    try {
        yield call(BranchesServices.editBranches, action.payload);
        const res = yield call(BranchesServices.listBranches);
        yield put(getListBranchesSuccess(res));
        toastSuccess('Sửa chi nhánh thành công')
    } catch (error) {
        toastError('Sửa chi nhánh không thành công');
    }
    yield put(hideLoading());
}

function* deleteBranch(action) {
    yield put(showLoading());
    try {
        yield call(BranchesServices.deleteBranch, action.payload);
        const res = yield call(BranchesServices.listBranches);
        yield put(getListBranchesSuccess(res));
        toastSuccess('Xóa chi nhánh thành công')
    } catch (error) {
        toastError('Xóa chi nhánh không thành công');
    }
    yield put(hideLoading());
}


export default function* categoriesSaga() {
    yield takeLatest(Actions.GET_LIST_BRANCHES, sagaPromise(getListBranches));
    yield takeLatest(Actions.EDIT_BRANCH, editListBranches);
    yield takeLatest(Actions.ADD_NEW_BRANCH, addNewBranches);
    yield takeLatest(Actions.DELETE_BRANCH, deleteBranch);
    yield takeLatest(Actions.SEARCH_LIST_BRANCHES, searchListBranches);
}
