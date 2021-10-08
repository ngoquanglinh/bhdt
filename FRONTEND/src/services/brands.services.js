import { axiosClient } from './config.service';

class BrandsServices {

  static listBrands(params) {
    let url = `api/brands`;
    return axiosClient.get(url, { params });
  }

  static searchListBrands(params) {
    let url = `api/brands/search`;
    return axiosClient.get(url, { params });
  }

  static editBrands(params) {
    let url = `api/brands/${params.id}`;
    return axiosClient.put(url, params)
  }

  static addNew(params) {
    let url = `api/brands`;
    return axiosClient.post(url, params)
  }
  static deleteBrand(id) {
    let url = `api/brands/${id}`;
    return axiosClient.delete(url)
  }
}
export default BrandsServices;
