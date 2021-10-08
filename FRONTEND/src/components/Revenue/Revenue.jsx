import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Card } from 'antd';

const currentDate = moment().format("HH:mm ngà\\y DD t\\háng MM nă\\m YYYY");
const defaultOptions = {
    chart: {
        height: 380,
        type: 'column'
    },
    title: {
        text: "Biều đồ tổng quan số liệu bán hàng trong tháng"
    },
    subtitle: {
        text: 'Số liệu tính đến ' + currentDate
    },
    xAxis: {
        categories: [
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'doanh thu (vnđ)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} vnđ</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: []
};

export default class ColumnChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            series: []
        }
    }

    render() {
        let { series, categories } = this.props;
        series = series ?? [];
        const options = { ...defaultOptions };
        options.xAxis.categories = categories;
        const chartConfig = {
            ...options,
            series: [...series]
        }



        return (
            <Card>
                <HighchartsReact options={chartConfig} />
            </Card>
        )
    }
}
