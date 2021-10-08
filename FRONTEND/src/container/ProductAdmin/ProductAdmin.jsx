import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    addNewProduct, removeProduct, getListCategories, paginationProduct,
    editProduct, getAllProduct, getListColor, getListSizes, getListBrands
} from '../../state/actions'
import './ProductAdmin.scss'
import moment from 'moment';
import { formatPriceVN } from '../../Helper/formatNumberHelper';
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Image } from 'antd';
import Button from "./../../components/Button";
import FormProduct from "./components/formProduct";

const { Search } = Input;

function ProductAdmin() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const warehouses = useSelector(state => state.warehouses.items);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 5,
        search: ""
    })

    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("add");
    const [item, setItem] = useState(null);
    const warehouseId = warehouses.length > 0 ? warehouses[0].id : 0;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllProduct(model))
            dispatch(getListCategories())
            dispatch(getListColor())
            dispatch(getListSizes())
            dispatch(getListBrands())
        }
        return () => mounted = false;
    }, [])

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllProduct(model))
        }
        return () => mounted = false;
    }, [model.page])

    const handlerRemoveItem = (id) => {
        dispatch(removeProduct(id))
    }

    const onSearch = value => dispatch(getAllProduct({ q: value }));
    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const columns = [
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'images',
            key: 'images',
            render: (images) =>
            (
                <Image
                    width={100}
                    style={{ borderRadius: "5px" }}
                    src={`http://localhost:8000${images[0]?.url}`}
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) =>
            (
                <>{formatPriceVN(price)}</>
            ),
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
        // {
        //     title: 'Số Lượng',
        //     dataIndex: 'quantity',
        //     key: 'quantity',
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
        {
            title: 'Chức Năng',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <>
                    <Button icon={<EditOutlined />}
                        onClick={() => {
                            setShowModal(true)
                            setItem(record)
                            setAction("edit")
                        }}
                        type="link"
                        placement="top" tooltip="Sửa" />
                </>

            ),
        },
        {
            title: 'Xoá',
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
            {
                showModal && (
                    <FormProduct
                        action={action}
                        item={item}
                        showModal={showModal}
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
                                        onClick={() => dispatch(getAllProduct(model))}
                                    />
                                </div>

                                <Button type="primary" className="mb-2"
                                    onClick={() => {
                                        setShowModal(true)
                                    }}>Thêm sản phẩm</Button>
                            </div>
                            <Table
                                size="middle"
                                dataSource={products?.items}
                                pagination={false}
                                columns={columns} />
                            <div className="d-flex mt-1">
                                <Pagination
                                    className="ml-auto"
                                    defaultCurrent={model.page}
                                    pageSize={model.pageSize}
                                    total={products?.total}
                                    onChange={changePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default ProductAdmin
