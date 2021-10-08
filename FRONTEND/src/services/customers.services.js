import { axiosClient } from './config.service';

class CustomersServices {
  // Jobs
  static listCustomer(params) {
    let url = `api/customers`;
    return axiosClient.get(url, { params });
  }
  static removeCustomer(id) {
    let url = `api/customers/${id}`;
    return axiosClient.delete(url);
  }
  static addCustomer(obj) {
    let url = `api/customers`;
    return axiosClient.post(url, obj);
  }
  static editCustomer(obj) {
    let url = `api/customers/${obj.id}`;
    return axiosClient.put(url, obj);
  }
  static addNew(obj) {
    let url = `api/customers`;
    return axiosClient.post(url, obj);
  }
}
export default CustomersServices;
