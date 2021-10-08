import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListBrands, DeleteBrand, searchListBrands, } from '../../state/actions';
import { ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Pagination, Select, Table, Popconfirm } from 'antd';
import Button from "./../../components/Button";
import Form from "./form";

const { Search } = Input;

function BrandsAdmin() {

    const { Option } = Select;
    const dispatch = useDispatch();
    const items = useSelector(state => state.brands.items);
    const total = useSelector(state => state.brands.total);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("add");
    const [item, setItem] = useState(null);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 5,
        search: ""
    });

    const handleDelete = (id) => {
        dispatch(DeleteBrand(id));
    }

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getListBrands(model))
        }
        return () => mounted = false;
    }, [model]);

    const onSearch = value => dispatch(searchListBrands({ q: value }));

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
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
                    onConfirm={() => handleDelete(record.id)}
                    okText="Có" cancelText="Không" >
                    <Button icon={<DeleteOutlined />} placement="top" tooltip="Xóa" type="link" />
                </Popconfirm>
            )
        },
    ];
    return (
        <Fragment>
            <div className="row inbox-wrapper">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-end control-header">
                                <div style={{ width: 250 }}>
                                    <Search placeholder="Tìm kiếm brands" onSearch={onSearch} enterButton />
                                </div>
                                <div>
                                    <Button
                                        type="success"
                                        className="mx-1 bg-success"
                                        icon={<ReloadOutlined />}
                                        onClick={() => dispatch(getListBrands(model))}
                                    />
                                </div>
                                <Button onClick={() => setShowModal(true)} type="primary"
                                    className="btn-add mb-2">Thêm brand</Button>
                            </div>
                            <Table
                                size="middle"
                                dataSource={items}
                                pagination={false}
                                columns={columns} />
                            <Pagination
                                defaultCurrent={model.page}
                                pageSize={model.pageSize}
                                total={total}
                                onChange={changePage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                !!showModal && (
                    <Form
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
        </Fragment>
    )
}

export default BrandsAdmin
