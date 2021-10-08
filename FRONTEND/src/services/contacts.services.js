import { axiosClient } from './config.service';

class CategoriesServices {
  // Jobs
  static listContact(params) {
    let url = `api/contacts`;
    return axiosClient.get(url, { params });
  }
  static removeContact(id) {
    let url = `api/contacts/${id}`;
    return axiosClient.delete(url);
  }
  static addContact(obj) {
    let url = `api/contacts`;
    return axiosClient.post(url, obj);
  }
  static editContact(obj) {
    let url = `api/contacts/${obj.id}`;
    return axiosClient.put(url, obj);
  }

}
export default CategoriesServices;
