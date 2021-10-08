import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getListCategories, addNewCategory, editCategories, DeleteCategory, paginationProduct, searchListCategories, } from '../../state/actions';
import { toastWarning } from '../../Helper/toastHelper';
import './CatetgoriesAdmin.scss';
import moment from 'moment';
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Row, Col } from 'antd';
import Button from "./../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../components/Input";
import Form from "./form";

const { Search } = Input;

function CatetgoriesAdmin() {
    const schema = yup.object().shape({
        name: yup.string().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const { Option } = Select;
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("add");
    const [item, setItem] = useState(null);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 5,
        search: ""
    });

    const handleDelete = (id) => {
        dispatch(DeleteCategory(id));
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
            dispatch(getListCategories(model))
        }
        return () => mounted = false;
    }, [model]);

    const onSearch = value => dispatch(searchListCategories({ q: value }));

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
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
                                    <Search placeholder="Tìm kiếm danh mục" onSearch={onSearch} enterButton />
                                </div>
                                <div>
                                    <Button
                                        className="mx-1 bg-success"
                                        icon={<ReloadOutlined />}
                                        onClick={() => dispatch(getListCategories(model))}
                                    />
                                </div>
                                <Button onClick={() => setShowModal(true)} type="primary"
                                    className="btn-add mb-2">Thêm danh mục</Button>
                            </div>
                            <Table
                                size="middle"
                                dataSource={categories?.items}
                                pagination={false}
                                columns={columns} />
                            <Pagination
                                defaultCurrent={model.page}
                                pageSize={model.pageSize}
                                total={categories?.total}
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

export default CatetgoriesAdmin
