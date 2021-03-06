import React, { Component, Fragment } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Report.css';
import moment from 'moment';
import ReportService from '../../services/report.service';
import { Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const date = new Date();
let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
firstDayOfMonth = moment(firstDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
lastDayOfMonth = moment(lastDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
class ReportCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            loading: true,
            filter: {
                fromDate: firstDayOfMonth,
                toDate: lastDayOfMonth,
            },
            name: '',
            description: '',
            dataStatictis: [],
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            chart: false,

            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                tooltip: {
                    pointFormat: '<b>{point.name}</b>: {point.percentage:.1f} % <br>total: {point.y}'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        },
                        size: 250
                    }

                },
                series: [{
                    data: [{
                        name: 'Kh??ch h??ng c??',
                        y: 0,
                    }, {
                        name: 'Kh??ch h??ng m???i',
                        y: 0
                    }
                    ]
                }]
            },
            startDate: date
        };



    }

    componentDidMount = () => {

        this.setState({
            loading: false
        })

        let { chartOptions, chart } = this.state;

        ReportService.getCustomer(this.state.filter)
            .then((data) => {

                chartOptions.series[0] = {
                    data:
                        [
                            {
                                name: 'Kh??ch h??ng m???i',
                                y: parseInt(data.data.dataCount.totalOrderSucessNewCustomer)
                            },
                            {

                                name: 'Kh??ch h??ng c??',
                                y: data.data.dataCount.totalOrderSuccess - data.data.dataCount.totalOrderSucessNewCustomer,
                            }
                        ]
                };

                this.setState({
                    loading: false,
                    chart: true,
                    chartOptions: chartOptions,
                    dataStatictis: data.data.dataFill
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                alert('T???i xu???ng b??o c??o kh??ng th??nh c??ng: ' + err.message, 'danger');
            });

    }

    handlelRefresh = () => {


        this.setState({
            loading: true
        })

        let { chartOptions } = this.state;
        ReportService.getCustomer()
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
                window.notify('T???i xu???ng ????n h??ng kh??ng th??nh c??ng: ' + err.message, 'danger');
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

        let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        firstDayOfMonth = moment(firstDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        let lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        lastDayOfMonth = moment(lastDayOfMonth).format('YYYY-MM-DD[T]HH:mm:ss.SSS');
        const filter = `fromDate=${firstDayOfMonth}&toDate=${lastDayOfMonth}`;
        this.setState({
            loading: true,
            startDate: date,
            filter: {
                fromDate: firstDayOfMonth,
                toDate: lastDayOfMonth,
            }
        });

        let { chartOptions, chart } = this.state;

        ReportService.getCustomer(filter)
            .then((data) => {

                chartOptions.series[0] = {
                    data:
                        [
                            {
                                name: 'Kh??ch h??ng m???i',
                                y: parseInt(data.data.dataCount.totalOrderSucessNewCustomer)
                            },
                            {

                                name: 'Kh??ch h??ng c??',
                                y: data.data.dataCount.totalOrderSuccess - data.data.dataCount.totalOrderSucessNewCustomer,
                            }
                        ]
                };

                this.setState({
                    loading: false,
                    chart: true,
                    chartOptions: chartOptions,
                    dataStatictis: data.data.dataFill
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
                alert('T???i xu???ng b??o c??o kh??ng th??nh c??ng: ' + err.message, 'danger');
            });
    }

    startDate
    render() {
        const { open, chartOptions, dataStatictis, startDate } = this.state;
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5 style={{ fontSzie: 14 }}>B??O C??O KH??CH H??NG</h5>
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
                                                        Bi???u ????? t??? l??? ch???t ????n kh??ch h??ng th??ng {startDate.getMonth() + 1} - 2020
                                                    </h4>

                                                    {
                                                        this.state.chart &&
                                                        <HighchartsReact
                                                            highcharts={Highcharts}
                                                            options={chartOptions}
                                                        />
                                                    }

                                                    <table className='table mt-3 report'>
                                                        <thead>
                                                            <tr>
                                                                <th>Th???i gian</th>
                                                                <th>S??? l?????ng ????n</th>
                                                                <th>S??? l?????ng ????n ch???t</th>
                                                                <th>Kh??ch h??ng m???i</th>
                                                                <th>Kh??ch h??ng c??</th>
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
                                                                    </tr>

                                                                ))


                                                            }
                                                        </tbody>
                                                    </table>
                                                    {
                                                        dataStatictis.length == 0 &&
                                                        <div className="alert alert-warning text-center w-100">
                                                            Ch??a c?? s??? li???u th???ng k??
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

export default ReportCustomer