import { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    paginationProduct, uploadFiles,
    getListColor, editBlog, removeBlog, addNewBlog, getListBlog
} from '../../state/actions'
import { ReloadOutlined, ScheduleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Modal, Pagination, Select, Table, Popconfirm, Badge, message, Tag, Image } from 'antd';
import Button from "./../../components/Button";
import moment from 'moment';
import Form from "./components";



const { Search } = Input;

function BlogAdmin() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const blogs = useSelector(state => state.blogs.blogs);
    const [editing, setEditing] = useState(false);
    const [blogInput, setBlogInput] = useState({
        title: "",
        image: "",
        id: "",
        disception: "",
        content: ""
    });
    const [model, setModel] = useState({
        page: 1,
        pageSize: 20,
        search: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState("add");
    const [item, setItem] = useState(null);

    const option = [
        { id: 0, name: "Chưa xử lý" },
        { id: 1, name: "Đã xử lý" },
    ]
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getListBlog(model))
        }
        return () => {
            mounted = false;
        };
    }, [model])

    const handlerRemoveItem = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa ?")) {
            dispatch(removeBlog(id))
        }
    }

    const openModalEdit = (item) => {
        setBlogInput({
            title: item.title,
            image: item.image,
            id: item.id,
            disception: item.disception,
            content: item.content
        });
        setEditing(true);
        setVisible(true)
    }
    const openModal = () => {
        setBlogInput({
            title: "",
            image: "",
            id: "",
            disception: "",
            content: ""
        })
        setVisible(true)
    }

    const onSearch = value => dispatch(getListBlog({ q: value }));

    const changePage = (page) => {
        setModel({
            ...model,
            page
        })
    }

    const columns = [
        {
            title: 'Tiêu Đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) =>
            (
                <Image
                    style={{ borderRadius: "5px" }}
                    width={100} src={`http://localhost:8000${image}`} />
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'disception',
            key: 'disception',
        },
        {
            title: 'Người Tạo',
            dataIndex: 'user',
            key: 'user',
            render: (user) =>
            (
                <>{user.username}</>
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
                                        onClick={() => dispatch(getListBlog(model))}
                                    />
                                </div>
                                <Button onClick={() => setShowModal(true)} type="primary"
                                    className="btn-add mb-2">Thêm bài viết</Button>
                            </div>

                            <Table
                                size="middle"
                                dataSource={blogs?.items}
                                pagination={false}
                                columns={columns} />
                            <div className="d-flex mt-1">
                                <Pagination
                                    className="ml-auto"
                                    defaultCurrent={model.page}
                                    pageSize={model.pageSize}
                                    total={blogs?.total}
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

export default BlogAdmin
