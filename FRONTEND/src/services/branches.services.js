import { axiosClient } from './config.service';

class BranchesServices {

  static listBranches(params) {
    let url = `api/branches`;
    return axiosClient.get(url, { params });
  }

  static searchListBranches(params) {
    let url = `api/branches/search`;
    return axiosClient.get(url, { params });
  }

  static editBranches(params) {
    let url = `api/branches/${params.id}`;
    return axiosClient.put(url, params)
  }

  static addNew(params) {
    let url = `api/branches`;
    return axiosClient.post(url, params)
  }
  static deleteBranch(id) {
    let url = `api/branches/${id}`;
    return axiosClient.delete(url)
  }
}
export default BranchesServices;
