import React, { Component, Fragment } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import DatePicker from 'react-datepicker';
import './Report.css';
import moment from 'moment';
import ReportService from '../../services/report.service';
import { ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
const date = new Date();
let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
firstDayOfMonth = moment(firstDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
lastDayOfMonth = moment(lastDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
class Revenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            showCalendar: false,
            name: '',
            description: '',
            dataStatictis: [],
            filter: {
                fromDate: firstDayOfMonth,
                toDate: lastDayOfMonth,
            },
            chartOptions: {

                title: {
                    text: ''
                },
                xAxis: {
                    categories: [],
                },
                yAxis: {
                    lineWidth: 1,
                    tickWidth: 1,
                    title: {
                        align: 'high',
                        text: '( vnđ )'
                    }
                },
                series: [
                    { data: [], name: 'Doanh thu' }
                ],
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                // mouseOver: this.setHoverData.bind(this)
                            }
                        }
                    }
                }
            },
            startDate: date
        };



    }

    componentDidMount = () => {

        this.setState({
            loading: true
        })

        let { chartOptions } = this.state;

        ReportService.getRevenue(this.state.filter)
            .then((data) => {

                const listDays = data.map(item => item.day);
                const listAmounts = data.map(item => item.totalAmount);
                chartOptions.xAxis.categories = listDays;
                chartOptions.series[0].data = listAmounts;
                this.setState({
                    loading: false,
                    dataStatictis: data,
                    chartOptions: chartOptions
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                alert('Tải xuống đơn hàng không thành công: ' + err.message, 'danger');
            });

    }




    handlelRefresh = () => {


        this.setState({
            loading: true
        })

        let { chartOptions } = this.state;

        ReportService.getRevenue()
            .then((data) => {

                const listDays = data.map(item => item.day);
                const listAmounts = data.map(item => item.totalAmount);
                chartOptions.xAxis.categories = listDays;
                chartOptions.series[0].data = listAmounts;
                this.setState({
                    loading: false,
                    dataStatictis: data,
                    chartOptions: chartOptions
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                window.notify('Tải xuống đơn hàng không thành công: ' + err.message, 'danger');
            });

    }

    updateSeries = () => {
        // The chart is updated only with new options.
        this.setState({
            chartOptions: {
                series: [
                    { data: [Math.random() * 5, 2, 1] }
                ]
            }
        });
    }


    setStartDate = (date) => {
        let firstDayOfMonths = new Date(date.getFullYear(), date.getMonth(), 1);
        firstDayOfMonths = moment(firstDayOfMonths).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        let lastDayOfMonths = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        lastDayOfMonths = moment(lastDayOfMonths).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        this.setState({
            loading: true,
            startDate: date,
            filter: {
                fromDate: firstDayOfMonths,
                toDate: lastDayOfMonths,
            }
        });

        let { chartOptions } = this.state;

        ReportService.getRevenue(this.state.filter)
            .then((data) => {

                const listDays = data.map(item => item.day);
                const listAmounts = data.map(item => item.totalAmount);
                chartOptions.xAxis.categories = listDays;
                chartOptions.series[0].data = listAmounts;
                this.setState({
                    loading: false,
                    dataStatictis: data,
                    chartOptions: chartOptions
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                alert('Tải xuống báo cáo không thành công: ' + err.message, 'danger');
            });

    }

    render() {
        const { chartOptions, dataStatictis, startDate } = this.state;

        return (
            <Fragment>
                {/* <!-- Container-fluid starts--> */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>BÁO CÁO DOANH THU</h5>
                                    <div className='d-flex align-items-center'>
                                        <DatePicker
                                            onChange={date => this.setStartDate(date)}
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            selected={startDate}
                                        />

                                        <Button
                                            type="success"
                                            className="mx-1 bg-success"
                                            icon={<ReloadOutlined />}
                                            onClick={this.handlelRefresh}
                                        />
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix"></div>
                                    <div id="basicScenario" className="product-physical">
                                        {
                                            this.state.loading
                                                ?
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p>Loading ...</p>
                                                </div>
                                                :
                                                <div>
                                                    <h4 className="text-center">
                                                        Biểu đồ thống kê doanh thu tháng {startDate.getMonth() + 1} - 2020
                                                    </h4>
                                                    <HighchartsReact
                                                        highcharts={Highcharts}
                                                        options={chartOptions}
                                                    />

                                                    <table className='table mt-3 report'>
                                                        <thead>
                                                            <tr>
                                                                <th>Thời gian</th>
                                                                <th>Số lượng đơn</th>
                                                                <th>Số lượng đơn chốt</th>
                                                                <th>Số lượng sản phẩm</th>
                                                                <th>Số lượng khách hàng</th>
                                                                <th>Doanh thu (đ)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                dataStatictis.length > 0 &&
                                                                dataStatictis.map(item => (

                                                                    <tr className={startDate.getDay() == item.day ? 'tr-active' : ''}>
                                                                        <td>{item.day}/{startDate.getMonth() + 1}</td>
                                                                        <td>{item.totalOrder}</td>
                                                                        <td>{item.totalOrderSuccess}</td>
                                                                        <td>{item.totalProduct}</td>
                                                                        <td>{0}</td>
                                                                        <td>{item.totalAmount.toLocaleString()}</td>
                                                                    </tr>

                                                                ))


                                                            }
                                                        </tbody>
                                                    </table>
                                                    {
                                                        dataStatictis.length == 0 &&
                                                        <div className="alert alert-warning text-center w-100">
                                                            Chưa có số liệu thống kê
                                                        </div>
                                                    }

                                                </div>

                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Container-fluid Ends--> */}

            </Fragment>
        )
    }
}

export default Revenue