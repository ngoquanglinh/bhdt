import { axiosClient } from './config.service';
class ReportService {
    // Jobs
    static getOverview(params) {
        let url = `api/reports/overview`;
        return axiosClient.get(url, { params });
    }
    static getRevenue(params) {
        console.log(params,'params')
        let url = `api/reports/revenue`;
        return axiosClient.get(url, { params });
    }
    static getCustomer(params) {
        let url = `api/reports/customer`;
        return axiosClient.get(url, { params });
    }
    static getEmployee(params) {
        let url = `api/reports/employee`;
        return axiosClient.get(url, { params });
    }

}
export default ReportService;