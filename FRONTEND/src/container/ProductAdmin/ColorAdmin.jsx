import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    paginationProduct,
    getListColor, removeColor,
} from '../../state/actions'
import './ProductAdmin.scss'
import moment from 'moment';
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Tag } from 'antd';
import Button from "./../../components/Button";
import FormColor from "./components/formColor";

const { Search } = Input;

function ProductAdmin() {
    const dispatch = useDispatch();
    const colors = useSelector(state => state.products.colors);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("add");
    const [item, setItem] = useState(null);

    const [model, setModel] = useState({
        page: 1,
        pageSize: 5,
        search: ""
    })

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getListColor(model))
        }
        return () => {
            mounted = false;
        };
    }, [model])

    const handleRemove = (id) => {
        dispatch(removeColor(id))
    }

    const onSearch = value => dispatch(getListColor({ q: value }));

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Màu sắc',
            dataIndex: 'color',
            key: 'color',
            render: (color) =>
            (
                <Tag color={color} >{color}</Tag >
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
                    text={moment(date).format('H:m:s MM/DD/YYYY')}
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
            width: '10%',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) =>
            (
                <Popconfirm title="Bạn có chắc muốn xóa?"
                    onConfirm={() => handleRemove(record.id)}
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
                    <FormColor
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
                                    <Search placeholder="Tìm kiếm màu" onSearch={onSearch} enterButton />
                                </div>
                                <div>
                                    <Button
                                        type="success"
                                        className="mx-1 bg-success"
                                        icon={<ReloadOutlined />}
                                        onClick={() => dispatch(getListColor(model))}
                                    />
                                </div>
                                <Button type="primary" className="mb-2"
                                    onClick={() => {
                                        setShowModal(true)
                                    }}>Thêm Màu</Button>
                            </div>

                            <Table
                                size="middle"
                                dataSource={colors?.items}
                                pagination={false}
                                columns={columns} />
                            <div className="d-flex mt-1">
                                <Pagination
                                    className="ml-auto"
                                    defaultCurrent={model.page}
                                    pageSize={model.pageSize}
                                    total={colors?.total}
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
