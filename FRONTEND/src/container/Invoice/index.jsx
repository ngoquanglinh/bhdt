import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    editOrder, removeOrder, addNewCustomer, getListOrder, getDetailOrder
} from '../../state/actions'
import { toastError } from './../../Helper/toastHelper';
import moment from 'moment';
import { formatPriceVN } from '../../Helper/formatNumberHelper';
import { ReloadOutlined, ScheduleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Tag } from 'antd';
import Button from "./../../components/Button";
import {
    useLocation
} from "react-router-dom";
import FormProduct from "./components/form";

const { Search } = Input;

function OrderAdmin() {
    const dispatch = useDispatch();
    const location = useLocation();
    let type = 1;
    switch (location.pathname) {
        case "/admin/products-import":
            type = 2;
            break;
        case "/admin/products-export":
            type = 3;
            break;
        default:
            type = 2;
            break;
    }
    const { Option } = Select;
    const option = [
        { id: 0, name: "Chưa xử lý" },
        { id: 1, name: "Đang xử lý" },
        { id: 2, name: "Đã xử lý" },
    ]
    const orders = useSelector(state => state.orders.orders);

    const [editing, setEditing] = useState(false)
    const [modalDetail, setModalDetail] = useState(false)
    const [action, setAction] = useState("add");
    const [itemDetail, setItemDetail] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState(null);
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
        pageSize: 6,
        search: "",
        type
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
        dispatch(editOrder({ item: orderInput }))

    }
    const handlerRemoveItem = (id) => {
        dispatch(removeOrder({ id, type: model.type }))
    }

    const onSearch = value => dispatch(getListOrder({ q: value }));

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const getCode = (item) => {
        switch (type) {
            case 1:
                return "BH" + ("00000" + item).slice(-8);
                break;
            case 2:
                return "NH" + ("00000" + item).slice(-8);
                break;
            default:
                return "XH" + ("00000" + item).slice(-8);
                break;
        }
    }

    const columns = [
        {
            title: type == 2 ? 'Mã Phiếu nhập' : 'Mã Phiếu xuất',
            dataIndex: 'id',
            key: 'id',
            render: (item) =>
            (
                <>{getCode(item)}</>
            ),
        },
        {
            title: 'Người tạo',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer) =>
            (
                <>{customer.username}</>
            ),
        },
        // {
        //     title: 'Vận chuyển',
        //     dataIndex: 'ship_address',
        //     key: 'ship_address',
        // },
        {
            title: type == 2 ? 'Số Lượng nhập' : 'Số Lượng xuất',
            dataIndex: 'order_items',
            key: 'order_items',
            render: (order_items) =>
            (
                <>{order_items.reduce(
                    (p, c) => p + c.quantity,
                    0
                )}</>
            ),
        },
        // {
        //     title: 'Trạng Thái',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (status) =>
        //     (
        //         status == 0 ?
        //             <Tag color="red">Chưa xử lý</Tag>
        //             :
        //             <Tag color="blue">Đã xử lý</Tag>
        //     ),
        // },
        {
            title: 'Ngày Tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) =>
            (
                <Button icon={<ScheduleOutlined />}
                    type={"link"}
                    onClick={e => e.preventDefault()}
                    text={moment(date).format('H:m:s MM/DD/YYYY')}
                />

            ),
        },
        // {
        //     title: 'Chức Năng',
        //     dataIndex: 'edit',
        //     key: 'edit',
        //     render: (text, record) => (
        //         <>
        //             <Button icon={<EditOutlined />}
        //                 onClick={() => openModalEdit(record)}
        //                 type="link"
        //                 placement="top" tooltip="Sửa" />
        //         </>

        //     ),
        // },
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
    console.log(orders?.items, "orders?.items");
    return (
        <Fragment>
            {
                showModal && (
                    <FormProduct
                        action={action}
                        item={item}
                        showModal={showModal}
                        type={model.type}
                        handleClose={() => {
                            setShowModal(false)
                            setItem(null)
                            setAction("add")
                        }}
                    />
                )
            }
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
                                    <Button type="primary" className="mb-2"
                                        onClick={() => {
                                            setShowModal(true)
                                        }}
                                    >Thêm mới</Button>
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
