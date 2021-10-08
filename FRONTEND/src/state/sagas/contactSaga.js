import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListContactSuccess } from '../actions';
import ContactsServices from './../../services/contacts.services';

// Handler Data JOB
function* getListContact(action) {
    try {
        const res = yield call(ContactsServices.listContact, action.payload);
        yield put(getListContactSuccess(res));
    } catch (e) {
        console.log(e);
    }
}
function* handlerEditContact(action) {
    const { item } = action.payload;
    try {
        yield call(ContactsServices.editContact, item);
        const res = yield call(ContactsServices.listContact, {});
        yield put(getListContactSuccess(res));
        yield toastSuccess('Sửa liên hệ thành công!');
    } catch (error) {
        yield toastError('Sửa liên hệ thất bại!');
    }
}

function* handlerRemoveContact(action) {
    try {
        yield call(ContactsServices.removeContact, action.payload)
        const res = yield call(ContactsServices.listContact, {});
        yield put(getListContactSuccess(res));
        toastSuccess('Xóa liên hệ thành công!')
    } catch (error) { }
}

function* handlerAddContact(action) {
    try {
        yield call(ContactsServices.addContact, action.payload);
        toastSuccess('Thêm liên hệ thành công')
    } catch (error) {
        toastError('Thêm liên hệ không thành công');
    }

}
export default function* contactsSaga() {
    yield takeLatest(Actions.GET_ALL_CONTACT, getListContact);
    yield takeLatest(Actions.EDIT_CONTACT, handlerEditContact);
    yield takeLatest(Actions.REMOVE_CONTACT, handlerRemoveContact);
    yield takeLatest(Actions.ADD_CONTACT, handlerAddContact);
}
