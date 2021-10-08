import { delay } from 'lodash';
import { call, put, takeLatest, take } from 'redux-saga/effects';
import { toastSuccess, toastError } from '../../Helper/toastHelper';
import UserService from './../../services/user.service';
import { sagaPromise } from '../../Helper/saga-promise-helpers';

import {
    Actions, getListUserRec, getProfileUserSuccess, userLoginSuccess,
    getAccountSuccess, getAccountError, showLoading, hideLoading
} from '../actions';

function* userLogin(action) {
    yield put(showLoading());
    try {
        const res = yield call(UserService.login, action.payload);
        const data = yield res;
        yield toastSuccess('Đăng nhập thành công');
        yield put(userLoginSuccess(data));
        yield put(hideLoading());
        return res;
    } catch (error) {
        yield put(hideLoading());
        yield toastError('Đăng nhập thất bại');
        return error;
    }
}
function* userRegis(action) {
    yield put(showLoading());
    try {
        const res = yield call(UserService.signUp, action.payload);
        yield toastSuccess('Đăng kí thành công');
        yield put(hideLoading());
        return res;
    } catch (error) {
        yield put(hideLoading());
        yield toastError('Đăng kí thất bại');
        return error;
    }
}

function* userInfo() {
    const infoUser = yield call(UserService.getProfile);
    const { recruitmentType } = infoUser;
    yield put(getListUserRec({ vip: recruitmentType === 1 ? true : false }))
    yield put(getProfileUserSuccess(infoUser));
}


function* getAccount(action) {
    try {
        const res = yield call(UserService.getAccount, action.payload);
        const data = yield res;
        yield put(getAccountSuccess(data));
    } catch (error) {
        console.log(error, 'Đăng nhập thất bại');
        yield put(getAccountError());
    }
}

export default function* loginSaga() {
    yield takeLatest(Actions.USER_LOGIN, sagaPromise(userLogin));
    yield takeLatest(Actions.GET_USER_INFO, userInfo);
    yield takeLatest(Actions.USER_SIGNUP, sagaPromise(userRegis));
    yield takeLatest(Actions.GET_ACCOUNT, getAccount);
}
