import { axiosClient } from './config.service';
const qs = require('query-string');
class ProductsService {
  // Jobs
  static listProducts(params) {
    let url = `api/products`;
    return axiosClient.get(url, { params });
  }

  static removeProduct(id) {
    let url = `api/products/${id}`;
    return axiosClient.delete(url);
  }

  static addProduct(params) {
    let url = `api/products`;
    return axiosClient.post(url, params);
  }

  static editProduct(params) {
    let url = `api/products/${params.id}`;
    return axiosClient.put(url, params);
  }

  static listColor(params) {
    let url = `api/colors`;
    return axiosClient.get(url, { params });
  }

  static listSizes(params) {
    let url = `api/sizes`;
    return axiosClient.get(url, { params });
  }

  static removeSize(id) {
    let url = `api/sizes/${id}`;
    return axiosClient.delete(url);
  }

  static addSize(params) {
    let url = `api/sizes`;
    return axiosClient.post(url, params);
  }

  static editSize(params) {
    let url = `api/sizes/${params.id}`;
    return axiosClient.put(url, params);
  }

  static removeColor(id) {
    let url = `api/colors/${id}`;
    return axiosClient.delete(url);
  }

  static addColor(params) {
    let url = `api/colors`;
    return axiosClient.post(url, params);
  }

  static editColor(params) {
    let url = `api/colors/${params.id}`;
    return axiosClient.put(url, params);
  }

  static addComment(params) {
    let url = `api/products/comment`;
    return axiosClient.post(url, params);
  }

  static getComment(params) {
    let url = `api/products/comment`
    return axiosClient.get(url, { params });
  }

  static getProductDetail(id) {
    let url = `api/products/${id}`;
    return axiosClient.get(url);
  }
}
export default ProductsService;