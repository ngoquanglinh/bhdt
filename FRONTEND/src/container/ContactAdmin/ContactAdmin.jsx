import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    paginationProduct,
    getListColor, editContact, removeContact, addNewColor, getListContact
} from '../../state/actions'
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Tag } from 'antd';
import Button from "./../../components/Button";
import moment from 'moment';

function ContactAdmin() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const contacts = useSelector(state => state.contacts.contacts);
    const [editing, setEditing] = useState(false)
    const [contactInput, setContactInput] = useState({
        message: "",
        status: "",
        id: ""
    });
    const [model, setModel] = useState({
        page: 1,
        pageSize: 20,
        search: ""
    });
    const option = [
        { id: 0, name: "Chưa xử lý" },
        { id: 1, name: "Đã xử lý" },
    ]
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getListContact(model))
        }
        return () => {
            mounted = false;
        };
    }, [model])

    function setValue(key, value) {
        setContactInput({ ...contactInput, [key]: value })
    }

    const handlerAddContact = () => {
        setVisible(false)
        setEditing(false)
        dispatch(addNewColor(contactInput))
    }
    const handlerEditContact = () => {
        dispatch(editContact({ item: contactInput }))
        setVisible(false)
        setEditing(false)
    }
    const handlerRemoveItem = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa ?")) {
            dispatch(removeContact(id))
        }
    }

    const openModalEdit = (item) => {
        setContactInput({
            message: item.message,
            status: item.status,
            id: item.id
        });
        setEditing(true);
        setVisible(true)
    }

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const columns = [
        {
            title: 'Nội Dung',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Khách Hàng',
            dataIndex: 'user',
            key: 'user',
            render: (user) =>
            (
                <>{user.username}</>
            ),
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) =>
            (
                status == 0 ?
                    <Tag color="red">Chưa xử lý</Tag>
                    :
                    <Tag color="blue">Đã xử lý</Tag>
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
                title={editing ? "Sửa liên hệ" : "Thêm liên hệ"}
                visible={visible}
                onOk={() => {
                    editing ? handlerEditContact() : handlerAddContact();
                }}
                onCancel={() => { setVisible(false); setEditing(false); }}
                width={400}
            >
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <form className="forms-sample  w-100">
                            <div className="form-group">
                                <div className="form-group">
                                    <label >Trạng thái</label>
                                    <Select
                                        className="w-100"
                                        placeholder="Trạng thái..."
                                        defaultValue={contactInput.status} style={{ width: 300 }}
                                        name="status"
                                        onChange={(v) => setValue("status", v)}>
                                        {option.map(item => <Option value={item.id} >{item.name}</Option>)}
                                    </Select>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal >
            <div className="row inbox-wrapper">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <Table
                                size="middle"
                                dataSource={contacts?.items}
                                pagination={false}
                                columns={columns} />
                            <div className="d-flex mt-1">
                                <Pagination
                                    className="ml-auto"
                                    defaultCurrent={model.page}
                                    pageSize={model.pageSize}
                                    total={contacts?.total}
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

export default ContactAdmin
