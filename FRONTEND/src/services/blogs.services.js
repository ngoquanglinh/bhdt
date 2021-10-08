import { axiosClient } from './config.service';

class BlogsServices {
  // Jobs
  static listBlog(params) {
    let url = `api/blogs`;
    return axiosClient.get(url, { params });
  }
  static removeBlog(id) {
    let url = `api/blogs/${id}`;
    return axiosClient.delete(url);
  }
  static addBlog(obj) {
    let url = `api/blogs`;
    return axiosClient.post(url, obj);
  }
  static editBlog(obj) {
    let url = `api/blogs/${obj.id}`;
    return axiosClient.put(url, obj);
  }
  static getDetailBlog(id) {
    let url = `api/blogs/${id}`;
    return axiosClient.get(url);
  }
}
export default BlogsServices;
