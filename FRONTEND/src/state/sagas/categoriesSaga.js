import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import { Actions, getListCategoriesSuccess, hideLoading, showLoading } from '../actions';
import CategoriesServices from './../../services/categories.services';

// Handler Data JOB
function* getListCategories(action) {
  yield put(showLoading())
  try {
    const res = yield call(CategoriesServices.listCategories, action.payload);
    yield put(getListCategoriesSuccess(res));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
  yield put(hideLoading());
}

function* searchListCategories(action) {
  yield put(showLoading())
  try {
    const res = yield call(CategoriesServices.searchListCategories, action.payload);
    yield put(getListCategoriesSuccess(res));
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
  yield put(hideLoading());
}


function* editListCategories(action) {
  yield put(showLoading())
  try {
    yield call(CategoriesServices.editCategories, action.payload);
    const res = yield call(CategoriesServices.listCategories);
    yield put(getListCategoriesSuccess(res));
    toastSuccess('Sửa danh mục thành công')
  } catch (error) {
    toastError('Sửa danh mục không thành công');
  }
  yield put(hideLoading());
}

function* addNewCategories(action) {
  yield put(showLoading())
  try {
    yield call(CategoriesServices.addNew, action.payload);
    const res = yield call(CategoriesServices.listCategories);
    yield put(getListCategoriesSuccess(res));
    toastSuccess('Thêm danh mục thành công')
  } catch (error) {
    toastError('Thêm danh mục không thành công');
  }
  yield put(hideLoading());
}
function* deleteCategory(action) {
  yield put(showLoading());

  try {
    yield call(CategoriesServices.deleteCategory, action.payload);
    const res = yield call(CategoriesServices.listCategories);
    yield put(getListCategoriesSuccess(res));
    toastSuccess('Xóa danh mục thành công')
  } catch (error) {
    toastError('Xóa danh mục không thành công');
  }
  yield put(hideLoading());
}
export default function* categoriesSaga() {
  yield takeLatest(Actions.GET_LIST_CATEGORIES, getListCategories);
  yield takeLatest(Actions.EDIT_CATEGORIES, editListCategories);
  yield takeLatest(Actions.ADD_NEW_CATEGORY, addNewCategories);
  yield takeLatest(Actions.DELETE_CATEGORY, deleteCategory);
  yield takeLatest(Actions.SEARCH_LIST_CATEGORIES, searchListCategories);

}
