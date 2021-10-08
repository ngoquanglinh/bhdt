import { axiosClient } from './config.service';

class UserService {
  // Jobs
  static login(obj) {
    const url = `api/users/login`;
    return axiosClient.post(url, { ...obj });
  }
  static signUp(obj) {
    const url = `/api/users/register`;
    return axiosClient.post(url, { ...obj });
  }

  static getProfile() {
    const url = `/api/user/profile`;
    return axiosClient.get(url);
  }

  static getListUser() {
    const url = `/api/users`;
    return axiosClient.get(url);
  }

  static editUserCV(obj) {
    const url = `/api/user`;
    return axiosClient.put(url, { ...obj });
  }

  static getListRecruitment() {
    const url = `/api/recruitment`;
    return axiosClient.get(url);
  }

  static getAccount(id) {
    const url = `/api/users/` + id;
    return axiosClient.get(url);
  }
  static editUser(obj) {
    const url = `/api/users/${obj.id}`;
    return axiosClient.put(url, { ...obj });
  }
}
export default UserService;
