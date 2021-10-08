import React, { Fragment, useEffect, useState } from 'react'
import IntroAdmin from '../../components/IntroAdmin/IntroAdmin'
import Revenue from '../../components/Revenue/Revenue'
import Statistical from '../../components/Statistical/Statistical'
import './Admin.scss'
import ReportService from '../../services/report.service'
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Tag, Image } from 'antd';
import Button from "./../../components/Button";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

const enumerateDaysBetweenDates = function (startDate, endDate) {

    var dates = [];
    var currDate = moment(startDate).startOf('day');
    var lastDate = moment(endDate).startOf('day');
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
        dates.push(currDate.clone().toDate());
    }
    return dates;
};

const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD hh:mm');
const listDates = enumerateDaysBetweenDates(moment(startOfMonth).add(-1, 'd'), moment().add(1, 'd'))
    .map(item => moment(item).format("DD/MM/YYYY"));

function Admin(props) {

    const [data, setData] = useState([])
    const warehouses = useSelector(state => state.warehouses.items);
    const warehouseId = warehouses.length > 0 ? warehouses[0].id : 0;
    useEffect(() => {

        ReportService.getOverview()
            .then(res => {
                setData(res.data);
            })

        return () => {
        }
    }, [])

    const columns = [
        {
            title: 'Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            className: 'text-left'
        },
        {
            title: 'Tồn kho',
            dataIndex: 'inventories',
            key: 'inventories',
            render: (inventories) =>
            (
                <>{inventories.find(item => item.warehouse_id == warehouseId)?.inventory || 0}</>
            ),
        },
        {
            title: 'Lượt Bán',
            dataIndex: 'bought',
            key: 'bought',
            className: 'text-center'
        },
        {
            title: 'Giá (đ)',
            dataIndex: 'price',
            key: 'price',
            render: (price) =>
            (
                price.toLocaleString()
            ),
            className: 'text-center'
        },
    ];

    return (
        <Fragment>
            <IntroAdmin />
            <div className="mt-5"></div>
            <Statistical data={data} />
            <div className="mt-3"></div>
            <Revenue
                categories={listDates}
                series={[{
                    name: 'Doanh thu',
                    data: data.totalAmount?.map(item => item.total)

                }]}
            />
            <div className="row mt-5">
                <div className="col-xl-12 xl-100">
                    <div className="card height-equal">
                        <div className="card-header py-3">
                            <h5 style={{ fontSize: 14 }}>DANH SÁCH SẢN PHẨM BÁN CHẠY</h5>
                        </div>
                        <div className="card-body" style={{ paddingBottom: 38 }}>
                            <div className="user-status table-responsive products-table">
                                <Table
                                    size="middle"
                                    dataSource={data?.productHots}
                                    pagination={false}
                                    columns={columns} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Admin
