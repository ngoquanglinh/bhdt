import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editBlog, addNewBlog, uploadFiles } from '../../../state/actions';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../../components/Input";
import moment from 'moment';

import CkeditorUploads from './../../../components/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ImageCk from '@ckeditor/ckeditor5-image/src/image';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

function Form({ item, action, showModal, handleClose }) {

    const schema = yup.object().shape({
        title: yup.string().required("Trường này là bắt buộc"),
        disception: yup.string().required("Trường này là bắt buộc"),
    });

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const [blogInput, setBlogInput] = useState({
        image: "",
        content: ""
    });

    useEffect(() => {
        if (item) {
            setBlogInput({
                image: item.image,
                content: item.content
            });
        }
    }, [])

    const submit = (data) => {
        data = {
            ...data,
            ...blogInput
        }
        if (action == "add") {
            dispatch(addNewBlog(data))
        } else {
            data = {
                ...data, id: item.id
            }
            dispatch(editBlog(data))
        }
        handleClose();
    };

    const handleUpFile = async (e) => {
        const formData = new FormData();
        const photos = document.querySelector('#files');

        for (let i = 0; i < photos.files.length; i++) {
            formData.append('files[]', photos.files[i]);
        }
        return new Promise((resolve, reject) => {
            dispatch(uploadFiles({ formData, resolve, reject }))
        }).then(x => {
            let images = [];
            if (x.success) {
                images = x.data.map(item => { return { url: item } });
            }
            setBlogInput({ ...blogInput, image: images[0].url });
        }).catch(e => console.log(e, "errors"));
    }
    const option = [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" },
        { id: 3, name: "Khác" },
    ]

    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm bài viết" : "Sửa bài viết"}
                        visible={showModal}
                        width={1000}
                        footer={null}
                        onCancel={handleClose}>
                        <form onSubmit={handleSubmit(submit)}>
                            <Row gutter={16}>
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (title) => (
                                                schema.validate({ title }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                name="title"
                                                label="Tiêu đề"
                                                placeholder="Tiêu đề..."
                                                error={error}
                                            />
                                        )}
                                        name="title"
                                        control={control}
                                        defaultValue={item ? item.title : ""}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={24}>
                                    <label for="image">Hình ảnh</label>
                                    <input type="file" name="files"
                                        className="form-control"
                                        autocomplete="off"
                                        id="files"
                                        onChange={handleUpFile}
                                        placeholder="hình ảnh..." />
                                    {
                                        blogInput.image && (
                                            <img className="mt-2" style={{ width: "50px", height: "50px" }}
                                                src={`http://localhost:8000${blogInput.image}`} alt="" />
                                        )
                                    }
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (disception) => (
                                                schema.validate({ disception }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                type="disception"
                                                name="disception"
                                                label="Mô tả"
                                                placeholder="Mô tả..."
                                                error={error}
                                            />
                                        )}
                                        name="disception"
                                        control={control}
                                        defaultValue={item ? item.disception : ""}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col md={24}>
                                    <label className="mb-1 d-flex" htmlFor={"content"}>Nội dung</label>
                                    <div className="form-group">
                                        <CKEditor
                                            config={{
                                                // plugins: [ImageCk],
                                                extraPlugins: [CkeditorUploads],
                                            }}
                                            editor={ClassicEditor}
                                            data={blogInput.content}
                                            placeholder="Nội dung..."
                                            id="content"
                                            name="content"
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setBlogInput({ ...blogInput, content: data })
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="d-flex mt-2">
                                <Button
                                    text={action == "add" ? "Thêm" : "Sửa"}
                                    className="ml-auto"
                                    onClick={() => handleSubmit(submit)()}
                                />
                            </div>
                        </form>
                    </Modal>
                )
            }
        </Fragment>
    )
}

export default Form
