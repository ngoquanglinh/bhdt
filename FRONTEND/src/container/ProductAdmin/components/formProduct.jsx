import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles, addNewProduct, editProduct } from '../../../state/actions';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../../components/Input";
import ImageProduct from './../../../components/ImageProduct/ImageProduct';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CkeditorUploads from './../../../components/ckeditor';

function Form({ item, action, showModal, handleClose }) {
    const schema = yup.object().shape({
        name: yup.string().required("Trường này là bắt buộc"),
        price: yup.number().typeError("Giá phải là kiểu số").required("Trường này là bắt buộc"),
        // quantity: yup.number().typeError("Số lượng phải là kiểu số").required("Trường này là bắt buộc"),
        // description: yup.string().required("Trường này là bắt buộc"),
        // colors: yup.array().required("Trường này là bắt buộc"),
        // sizes: yup.array().required("Trường này là bắt buộc"),
        category_id: yup.string().required("Trường này là bắt buộc"),
        brand_id: yup.string().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const { Option } = Select;
    const colors = useSelector(state => state.products.colors);
    const sizes = useSelector(state => state.products.sizes);
    const brands = useSelector(state => state.brands.items);
    const [images, setImages] = useState([]);
    const [descInput, setDescInput] = useState({
        description: ""
    });

    useEffect(() => {
        if (item) {
            setImages(item.images);
            setDescInput({ description: item.description });
        }
    }, [])

    const submit = (data) => {
        data = {
            ...data,
            ...descInput,
            images: images,
            discount: 0,
            trend_count: 0
        }
        if (action == "add") {
            dispatch(addNewProduct({ ...data, quantity: 1 }))
        } else {
            data = {
                ...data, id: item.id, quantity: 1
            }
            dispatch(editProduct(data))
        }
        handleClose();
    };

    const handlerUpFile = async (e) => {

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
            setImages(images);
        }).catch(e => console.log(e, "errors"));

    }

    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                        visible={showModal}
                        footer={null}
                        width={768}
                        onCancel={handleClose}>
                        <form onSubmit={handleSubmit(submit)}>
                            <Row gutter={16}>
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (name) => (
                                                schema.validate({ name }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                name="name"
                                                label="Tên sản phẩm"
                                                placeholder="Tên sản phẩm..."
                                                error={error}
                                            />
                                        )}
                                        name="name"
                                        control={control}
                                        defaultValue={item ? item.name : ""}
                                    />
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (price) => (
                                                schema.validate({ price }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                name="price"
                                                label="Giá"
                                                placeholder="Giá..."
                                                error={error}
                                            />
                                        )}
                                        name="price"
                                        control={control}
                                        defaultValue={item ? item.price : ""}
                                    />
                                </Col>
                            </Row>
                            {/* <Row className="mt-1">
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (quantity) => (
                                                schema.validate({ quantity }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                name="quantity"
                                                label="Số lượng"
                                                placeholder="Số lượng..."
                                                error={error}
                                            />
                                        )}
                                        name="quantity"
                                        control={control}
                                        defaultValue={item ? item.quantity : ""}
                                    />
                                </Col>
                            </Row> */}
                            <Row className="mt-1">
                                <Col md={24}>
                                    <Controller
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                type="number"
                                                autoFocus
                                                name="discount"
                                                label="giảm giá (%)"
                                                placeholder="giảm giá..."
                                                error={error}
                                            />
                                        )}
                                        name="discount"
                                        control={control}
                                        defaultValue={item ? item.discount : ""}
                                    />
                                </Col>
                            </Row>
                            {/* <Row className="mt-1">
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (description) => (
                                                schema.validate({ description }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                name="description"
                                                label="Mô tả"
                                                placeholder="Mô tả..."
                                                tag={"textArea"}
                                                error={error}
                                            />
                                        )}
                                        name="description"
                                        control={control}
                                        defaultValue={item ? item.description : ""}
                                    />
                                </Col>
                            </Row> */}
                            <Row className="mt-1">
                                <Col md={24}>
                                    <label className="mb-1 d-flex" htmlFor={"description"}>Mô tả</label>
                                    <div className="form-group">
                                        <CKEditor
                                            config={{
                                                extraPlugins: [CkeditorUploads],
                                            }}
                                            editor={ClassicEditor}
                                            data={descInput.description}
                                            placeholder="Mô tả..."
                                            id="description"
                                            name="description"
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescInput({ ...descInput, description: data })
                                            }}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <label className="mb-1 d-flex" htmlFor={"category_id"}>Chọn danh mục</label>
                                <Controller
                                    rules={{
                                        validate: (categoryId) => (
                                            schema.validate({ categoryId }).catch((e) => e.message))
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Select
                                            {...field}
                                            id="category_id"
                                            name="category_id"
                                            placeholder="Chọn danh mục..."
                                            className="w-100"
                                            error={error}
                                        >
                                            {categories?.items?.map(item => <Option value={item.id}>
                                                {item.name}
                                            </Option>)}
                                        </Select>

                                    )}
                                    name="category_id"
                                    control={control}
                                    defaultValue={item ? item.category_id : ""}
                                />
                            </Row>
                            <Row className="mt-1">
                                <label className="mb-1 d-flex" htmlFor={"brand_id"}>Chọn brand</label>
                                <Controller
                                    rules={{
                                        validate: (brandId) => (
                                            schema.validate({ brandId }).catch((e) => e.message))
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Select
                                            {...field}
                                            id="brand_id"
                                            name="brand_id"
                                            placeholder="Chọn brand..."
                                            className="w-100"
                                            error={error}
                                        >
                                            {brands.map(item => <Option value={item.id}>
                                                {item.name}
                                            </Option>)}
                                        </Select>

                                    )}
                                    name="brand_id"
                                    control={control}
                                    defaultValue={item ? item.brand_id : ""}
                                />
                            </Row>
                            <Row className="mt-1">
                                <label className="mb-1 d-flex" htmlFor={"sizes"}>Kích thước</label>
                                <Controller
                                    rules={{
                                        validate: (sizes) => (
                                            schema.validate({ sizes }).catch((e) => e.message))
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Select
                                            {...field}
                                            id="sizes"
                                            name="sizes"
                                            placeholder="Kích thước..."
                                            className="w-100"
                                            error={error}
                                            mode="multiple"
                                        >
                                            {sizes?.items?.map(item => <Option value={item.id}>
                                                {item.name}
                                            </Option>)}
                                        </Select>

                                    )}
                                    name="sizes"
                                    control={control}
                                    defaultValue={item ? item.sizes.map(x => x.id) : []}
                                />
                            </Row>
                            <Row className="mt-1">
                                <label className="mb-1 d-flex" htmlFor={"colors"}>Màu</label>
                                <Controller
                                    rules={{
                                        validate: (colors) => (
                                            schema.validate({ colors }).catch((e) => e.message))
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Select
                                            {...field}
                                            id="colors"
                                            name="colors"
                                            placeholder="Màu..."
                                            className="w-100"
                                            error={error}
                                            mode="multiple"
                                        >
                                            {colors?.items?.map(item => <Option value={item.id}>
                                                {item.name}
                                            </Option>)}
                                        </Select>

                                    )}
                                    name="colors"
                                    control={control}
                                    defaultValue={item ? item.colors.map(x => x.id) : []}
                                />
                            </Row>
                            <Row className="mt-1">
                                <Col md={24}>
                                    <div className="form-group">
                                        <input type="file" id="files" onChange={handlerUpFile} multiple />
                                    </div>
                                    {
                                        images && (images.map(x => {
                                            return (
                                                <ImageProduct
                                                    src={`http://localhost:8000${x.url}`}
                                                    width={90}
                                                    height={90}
                                                    className="ml-1"
                                                />
                                            )
                                        }))
                                    }
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
