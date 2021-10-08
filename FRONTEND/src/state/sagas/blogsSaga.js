import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListBlogSuccess, hideLoading, showLoading } from '../actions';
import BlogsServices from './../../services/blogs.services';

// Handler Data JOB
function* getListBlog(action) {
    yield put(showLoading())

    try {
        const res = yield call(BlogsServices.listBlog, action.payload);
        yield put(getListBlogSuccess(res));
    } catch (e) {
        console.log(e);
    }
    yield put(hideLoading());
}
function* handlerEditBlog(action) {
    yield put(showLoading())

    try {
        yield call(BlogsServices.editBlog, action.payload);
        const res = yield call(BlogsServices.listBlog, {});
        yield put(getListBlogSuccess(res));
        yield toastSuccess('Sửa bài viết thành công!');
    } catch (error) {
        yield toastError('Sửa bài viết không thành công!');
    }
    yield put(hideLoading());
}

function* handlerRemoveBlog(action) {
    yield put(showLoading())

    try {
        yield call(BlogsServices.removeBlog, action.payload)
        const res = yield call(BlogsServices.listBlog, {});
        yield put(getListBlogSuccess(res));
        toastSuccess('Xóa bài viết thành công!')
    } catch (error) { }
    yield put(hideLoading());
}

function* handlerAddBlog(action) {
    yield put(showLoading())

    const product = action.payload;
    try {
        yield call(BlogsServices.addBlog, product);
        yield toastSuccess('Thêm bài viết thành công!');
        const res = yield call(BlogsServices.listBlog);
        yield put(getListBlogSuccess(res));
    } catch (error) { }
    yield put(hideLoading());
}

function* handlerGetDetailBlog(action) {
    yield put(showLoading())

    const { resolve, reject, id } = action.payload;
    try {
        const res = yield call(BlogsServices.getDetailBlog, id);
        resolve(res)
    } catch (e) {
        console.log(e);
        reject(e)
    }
    yield put(hideLoading());
}
export default function* contactsSaga() {
    yield takeLatest(Actions.GET_ALL_BLOG, getListBlog);
    yield takeLatest(Actions.EDIT_BLOG, handlerEditBlog);
    yield takeLatest(Actions.REMOVE_BLOG, handlerRemoveBlog);
    yield takeLatest(Actions.ADD_BLOG, handlerAddBlog);
    yield takeLatest(Actions.GET_DETAIL_BLOG, handlerGetDetailBlog);
}
