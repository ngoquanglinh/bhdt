
import { axiosClientFile } from './configFile.service';

class UpfileService {
  // Jobs
  static upfile(obj) {
    const url = `/api/uploads/public/product`;
    return axiosClientFile.post(url, obj);
  }
}
export default UpfileService;
