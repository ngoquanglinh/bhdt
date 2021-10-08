import { axiosClient } from './config.service';

class WarehousesServices {

  static listWarehouses(params) {
    let url = `api/warehouses`;
    return axiosClient.get(url, { params });
  }

  static searchListWarehouses(params) {
    let url = `api/warehouses/search`;
    return axiosClient.get(url, { params });
  }

  static editWarehouses(params) {
    let url = `api/warehouses/${params.id}`;
    return axiosClient.put(url, params)
  }

  static addNew(params) {
    let url = `api/warehouses`;
    return axiosClient.post(url, params)
  }
  static deleteBranch(id) {
    let url = `api/warehouses/${id}`;
    return axiosClient.delete(url)
  }
}
export default WarehousesServices;
