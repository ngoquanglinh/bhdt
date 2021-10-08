import { axiosClient } from './config.service';

class SlidesServices {

  static listSlides(params) {
    let url = `api/slides`;
    return axiosClient.get(url, { params });
  }

  static searchListSlides(params) {
    let url = `api/slides/search`;
    return axiosClient.get(url, { params });
  }

  static editSlides(params) {
    let url = `api/slides/${params.id}`;
    return axiosClient.put(url, params)
  }

  static addNew(params) {
    let url = `api/slides`;
    return axiosClient.post(url, params)
  }
  static deleteSlide(id) {
    let url = `api/slides/${id}`;
    return axiosClient.delete(url)
  }


}
export default SlidesServices;
