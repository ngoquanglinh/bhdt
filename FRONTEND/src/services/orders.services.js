import { axiosClient } from './config.service';

class OrdersServices {
  // Jobs
  static listOrder(params) {
    let url = `api/orders`;
    return axiosClient.get(url, { params });
  }
  static removeOrder(id) {
    let url = `api/orders/${id}`;
    return axiosClient.delete(url);
  }
  static addOrder(obj) {
    let url = `api/orders`;
    return axiosClient.post(url, obj);
  }
  static editOrder(obj) {
    let url = `api/orders/${obj.id}`;
    return axiosClient.put(url, obj);
  }
  static addNew(obj) {
    let url = `api/orders`;
    return axiosClient.post(url, obj);
  }
  static getDetailOrder(id) {
    let url = `api/orders/invoice/${id}`;
    return axiosClient.get(url);
  }
  static getOrder(id) {
    let url = `api/orders/${id}`;
    return axiosClient.get(url);
  }
}
export default OrdersServices;
