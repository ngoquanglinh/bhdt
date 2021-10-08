import { axiosClient } from './config.service';

class CategoriesServices {

  static listCategories(params) {
    let url = `api/categories`;
    return axiosClient.get(url, { params });
  }

  static searchListCategories(params) {
    let url = `api/categories/search`;
    return axiosClient.get(url, { params });
  }

  static editCategories(params) {
    let url = `api/categories/${params.id}`;
    return axiosClient.put(url, { params })
  }

  static addNew(params) {
    let url = `api/categories`;
    return axiosClient.post(url, params)
  }
  static deleteCategory(id) {
    let url = `api/categories/${id}`;
    return axiosClient.delete(url)
  }


}
export default CategoriesServices;
