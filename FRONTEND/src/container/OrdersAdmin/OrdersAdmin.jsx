import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    paginationProduct,
    getListColor, editOrder, removeOrder, addNewCustomer, getListOrder, getDetailOrder
} from '../../state/actions'
import { toastError, toastSuccess } from './../../Helper/toastHelper';
import moment from 'moment';
import { formatPriceVN } from '../../Helper/formatNumberHelper';
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Tag } from 'antd';
import Button from "./../../components/Button";

const { Search } = Input;

function OrderAdmin() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const option = [
        { id: 0, name: "Chưa xử lý" },
        { id: 1, name: "Đang xử lý" },
        { id: 2, name: "Đã giao hàng" },
        { id: 3, name: "Khách hủy" },
        { id: 4, name: "Shop hủy" },
    ]
    const orders = useSelector(state => state.orders.orders);

    const totalColor = useSelector(state => state.products.total);
    const perPage = useSelector(state => state.products.perPage);
    const [editing, setEditing] = useState(false)
    const [modalDetail, setModalDetail] = useState(false)
    const [itemDetail, setItemDetail] = useState(null)
    const [orderInput, setorderInput] = useState({
        id: null,
        name: "abcd",
        username: "",
        email: "",
        password: "",
        c_password: "",
        role: "customer",
        gender: 1,
        birthday: moment().format("Y-m-d H:i:s"),
        phone: "",
        status: 0
    });
    const [model, setModel] = useState({
        page: 1,
        pageSize: 50,
        search: "",
        type: 1
    });
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getListOrder(model))
        }
        return () => {
            mounted = false;
        };
    }, [model])

    const onChangeCustomerInput = (e) => {
        const val = e.target.value;
        setorderInput({ ...orderInput, [e.target.name]: val })
    }

    function setValue(key, value) {
        setorderInput({ ...orderInput, [key]: value })
    }

    const handlerAddCustomer = () => {

        if (!orderInput.username || !orderInput.email || !orderInput.phone ||
            !orderInput.password || !orderInput.c_password) {
            toastError('Các trường không được để trống');
        } else if (orderInput.password != orderInput.c_password) {
            toastError('Mật khẩu không khớp');
        } else {
            setVisible(false)
            setEditing(false)
            dispatch(addNewCustomer(orderInput))
        }
    }

    const handlerEditCustomer = () => {

        setVisible(false)
        setEditing(false)
        dispatch(editOrder({ item: orderInput, type: 1 }))

    }
    const handlerRemoveItem = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa ?")) {
            dispatch(removeOrder({ id, type: 1 }))
        }
    }

    const openModalEdit = (item) => {
        setorderInput({
            ...item,
            id: item.id,
            name: "abcd",
            username: item.username,
            email: item.email,
            password: "",
            c_password: "",
            role: "customer",
            gender: 1,
            birthday: moment().format("Y-m-d H:i:s"),
            phone: "",
            status: item.status
        });
        setEditing(true);
        setVisible(true)
    }

    const openModal = () => {
        setorderInput({
            id: null,
            name: "abcd",
            username: "",
            email: "",
            password: "",
            c_password: "",
            role: "customer",
            gender: 1,
            birthday: new Date(),
            phone: "",
            status: 0
        })
        setVisible(true)
    }

    const openModalDetail = (item) => {
        setItemDetail(item.order_items)
        setModalDetail(true);
    }

    const onSearch = value => dispatch(getListOrder({ q: value }));

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const renderStatus = (status) => {
        switch (status) {
            case 0:
                return (
                    <Tag color="#6C4A4A">Chưa xử lý</Tag>
                )
            case 1:
                return (
                    <Tag color="#F0A500">Đang xử lý</Tag>
                )
            case 2:
                return (
                    <Tag color="#00A19D">Đã giao hàng</Tag>
                )
            case 3:
                return (
                    <Tag color="#bf1f1f">Khách hủy</Tag>
                )
            default:
                return (
                    <Tag color="#52006A">Shop hủy</Tag>
                )
        }
    }

    const columns = [
        {
            title: 'Mã Đơn',
            dataIndex: 'id',
            key: 'id',
            render: (item) =>
            (
                <>{"BH" + ("00000" + item).slice(-8)}</>
            ),
        },
        {
            title: 'Khách Hàng',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) =>
            (
                <>{customer.username}</>
            ),
        },
        {
            title: 'Vận chuyển',
            dataIndex: 'ship_address',
            key: 'ship_address',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'total',
            key: 'total',
            render: (total) =>
            (
                <>{formatPriceVN(total)}</>
            ),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) =>
            (
                renderStatus(status)

            ),
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) =>
            (
                <Button icon={<ScheduleOutlined />}
                    type={"link"}
                    onClick={e => e.preventDefault()}
                    text={moment(date).format('H:m DD/MM/YYYY')}
                />

            ),
        },
        {
            title: 'Chức Năng',
            dataIndex: 'edit',
            key: 'edit',
            render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />}
                        onClick={() => openModalEdit(record)}
                        type="link"
                        placement="top" tooltip="Sửa" />
                </>

            ),
        },
        {
            title: 'Xoá',
            width: '10%',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) =>
            (
                <Popconfirm title="Bạn có chắc muốn xóa?"
                    onConfirm={() => handlerRemoveItem(record.id)}
                    okText="Có" cancelText="Không" >
                    <Button icon={<DeleteOutlined />} placement="top" tooltip="Xóa" type="link" />
                </Popconfirm>
            )
        },
    ];

    return (
        <Fragment>
            <Modal
                title={editing ? "Sửa đơn hàng" : "Thêm khách hàng"}
                visible={visible}
                onOk={() => {
                    editing ? handlerEditCustomer() : handlerAddCustomer();
                }}
                onCancel={() => { setVisible(false); setEditing(false); }}
                width={500}
            >
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <form className="forms-sample w-100">
                            <div className="form-group">
                                <label for="exampleInputEmail1">Trạng thái</label>
                                <Select
                                    className="w-100"
                                    placeholder="Trạng thái..."
                                    defaultValue={orderInput.status} style={{ width: 300 }}
                                    name="status"
                                    onChange={(v) => setValue("status", v)}>
                                    {option.map(item => <Option value={item.id} >{item.name}</Option>)}
                                </Select>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal >
            <div className="row inbox-wrapper">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-end control-header">
                                <div style={{ width: 250 }}>
                                    <Search placeholder="Tìm kiếm danh mục" onSearch={onSearch} enterButton />
                                </div>
                                <div>
                                    <Button
                                        type="success"
                                        className="mx-1 bg-success"
                                        icon={<ReloadOutlined />}
                                        onClick={() => dispatch(getListOrder(model))}
                                    />
                                </div>
                            </div>

                            <Table
                                size="middle"
                                dataSource={orders?.items}
                                pagination={false}
                                columns={columns} />
                            <div className="d-flex mt-1">
                                <Pagination
                                    className="ml-auto"
                                    defaultCurrent={model.page}
                                    pageSize={model.pageSize}
                                    total={orders?.total}
                                    onChange={changePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title={"Chi tiết đơn hàng"}
                visible={modalDetail}
                onCancel={() => { setModalDetail(false) }}
                width={756}
            >
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="w-100">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr className="text-center">
                                            <th>#</th>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Màu</th>
                                            <th>Kích thước</th>
                                            <th>giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            itemDetail?.length > 0 && itemDetail.map((it, i) => {
                                                return (
                                                    <tr>
                                                        <td>{i + 1}</td>
                                                        <td>{it.product.name}</td>
                                                        <td>{it.quantity}</td>
                                                        <td>{it.color.name}</td>
                                                        <td>{it.size.name}</td>
                                                        <td>{it.product.price}</td>
                                                    </tr>

                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal >
        </Fragment >
    )
}

export default OrderAdmin
