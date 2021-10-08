import { call, put, takeLatest } from 'redux-saga/effects';
import {
    Actions, getAllProductSuccess,
    getAllColorSuccess, getAllSizeSuccess, showLoading, hideLoading,
} from '../actions';
import UpfileService from './../../services/upfile.service';
import { toastError, toastSuccess } from '../../Helper/toastHelper';
import ProductsService from './../../services/product.service';
import { BASE_URL } from '../../constant/constant';
import { sagaPromise } from '../../Helper/saga-promise-helpers';


function* getListProducts(action) {
    yield put(showLoading())
    try {
        const res = yield call(ProductsService.listProducts, action.payload);
        yield put(getAllProductSuccess(res));
        yield put(hideLoading());
        return res;
    } catch (error) {
        yield put(hideLoading());
        return error;
    }
}

function* getProductDetail(action) {
    yield put(showLoading())
    try {
        const res = yield call(ProductsService.getProductDetail, action.payload.id);
        yield put(hideLoading());
        return res;
    } catch (error) {
        yield put(hideLoading());
        return error;
    }
}

function* handlerRemoveProduct(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.removeProduct, action.payload)
        const res = yield call(ProductsService.listProducts);
        yield put(getAllProductSuccess(res));
        toastSuccess('Xóa sản phẩm thành công!!')

    } catch (error) { }
    yield put(hideLoading());
}

function* handlerAddProduct(action) {
    const product = action.payload;
    yield put(showLoading())
    try {
        yield call(ProductsService.addProduct, product);
        yield toastSuccess('Thêm sản phẩm mới thành công!');
        const res = yield call(ProductsService.listProducts);
        yield put(getAllProductSuccess(res));
    } catch (error) { }
    yield put(hideLoading());
}
function* handlerEditProduct(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.editProduct, action.payload);
        yield toastSuccess('Sửa sản phẩm thành công!');
        const res = yield call(ProductsService.listProducts);
        yield put(getAllProductSuccess(res));
    } catch (error) {
        yield toastError('Sửa sản phẩm thất bại!');
    }
    yield put(hideLoading());
}
function* getListColor(action) {
    yield put(showLoading())
    try {
        const res = yield call(ProductsService.listColor, action.payload);
        yield put(getAllColorSuccess(res));

    } catch (error) { }
    yield put(hideLoading());
}

function* getListSizes(action) {
    yield put(showLoading())
    try {
        const res = yield call(ProductsService.listSizes, action.payload);
        yield put(getAllSizeSuccess(res));

    } catch (error) { }
    yield put(hideLoading());
}

function* uploadFiles(action) {
    const { resolve, reject } = action.payload;
    try {
        const img = yield call(UpfileService.upfile, action.payload.formData);
        resolve(img)
    } catch (error) { reject(error) }
}

function* handlerRemoveSize(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.removeSize, action.payload)
        const res = yield call(ProductsService.listSizes);
        yield put(getAllSizeSuccess(res));
        toastSuccess('Xóa size thành công!')

    } catch (error) { }
    yield put(hideLoading());
}

function* handlerAddSize(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.addSize, action.payload);
        const res = yield call(ProductsService.listSizes);
        yield put(getAllSizeSuccess(res));
        yield toastSuccess('Thêm kích thước thành công!');
    } catch (error) { }
    yield put(hideLoading());
}

function* handlerEditSize(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.editSize, action.payload);
        const res = yield call(ProductsService.listSizes);
        yield put(getAllSizeSuccess(res));
        yield toastSuccess('Sửa kích thước thành công!');
    } catch (error) {
        yield toastError('Sửa kích thước thất bại!');
    }
    yield put(hideLoading());
}

function* handlerRemoveColor(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.removeColor, action.payload)
        const res = yield call(ProductsService.listColor);
        yield put(getAllColorSuccess(res));
        toastSuccess('Xóa kích thước thành công!')

    } catch (error) { }
    yield put(hideLoading());
}

function* handlerAddColor(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.addColor, action.payload);
        const res = yield call(ProductsService.listColor);

        yield put(getAllColorSuccess(res));
        yield toastSuccess('Thêm màu thành công!');
    } catch (error) { }
    yield put(hideLoading());
}

function* handlerEditColor(action) {
    yield put(showLoading())
    try {
        yield call(ProductsService.editColor, action.payload);
        const res = yield call(ProductsService.listColor);
        yield put(getAllColorSuccess(res));
        yield toastSuccess('Sửa màu thành công!');
    } catch (error) {
        yield toastError('Sửa màu thất bại!');
    }
    yield put(hideLoading());
}
export default function* productSaga() {
    yield takeLatest(Actions.GET_ALL_PRODUCT, sagaPromise(getListProducts));
    yield takeLatest(Actions.ADD_PRODUCT, handlerAddProduct);
    yield takeLatest(Actions.REMOVE_PRODUCT, handlerRemoveProduct);
    yield takeLatest(Actions.EDIT_PRODUCT, handlerEditProduct);
    yield takeLatest(Actions.GET_ALL_COLOR, getListColor);
    yield takeLatest(Actions.GET_ALL_SIZE, getListSizes);
    yield takeLatest(Actions.UPLOADS_FILES, uploadFiles);
    yield takeLatest(Actions.REMOVE_SIZE, handlerRemoveSize);
    yield takeLatest(Actions.ADD_SIZE, handlerAddSize);
    yield takeLatest(Actions.EDIT_SIZE, handlerEditSize);
    yield takeLatest(Actions.REMOVE_COLOR, handlerRemoveColor);
    yield takeLatest(Actions.ADD_COLOR, handlerAddColor);
    yield takeLatest(Actions.EDIT_COLOR, handlerEditColor);
    yield takeLatest(Actions.GET_PRODUCT_DETAIL, sagaPromise(getProductDetail));
}
