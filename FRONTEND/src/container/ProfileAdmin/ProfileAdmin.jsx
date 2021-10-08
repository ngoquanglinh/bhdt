import React, { Fragment, useEffect, useState, useRef } from 'react'
import { toastSuccess, toastError } from './../../Helper/toastHelper';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { userLogin, getAcount, uploadFiles } from '../../state/actions';
import UserService from '../../services/user.service';
import { Select, Row, Col } from 'antd';
// import { Button } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from "./../../components/Button";
import InputCus from "./../../components/Input";

function ProfileAdmin() {
    const { Option } = Select;
    const item = useSelector(state => state.login.user);
    const dispatch = useDispatch();
    const refInput = useRef();

    const schema = yup.object().shape({
        username: yup.string().required("Trường này là bắt buộc"),
        email: yup.string().email("Email chưa chính xác").required("Trường này là bắt buộc"),
        phone: yup.string().required("Trường này là bắt buộc"),
        gender: yup.string().required("Trường này là bắt buộc"),
        address: yup.string().required("Trường này là bắt buộc"),
    });

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const option = [
        { name: "Nam", value: 1 },
        { name: "Nữ", value: 2 },
        { name: "Khác", value: 3 }
    ]

    const [image, setImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (item.profile?.avatar) {
            setImage(item.profile?.avatar);
        }
    }, [])

    const submit = (model) => {
        model = {
            ...model,
            id: item.id,
            name: model.username,
            avatar: image
        }

        UserService.editUser(model)
            .then(data => {
                if (data.success) {
                    toastSuccess("Sửa thành công");
                }
            })
            .catch(err => {
                toastError("Sửa không thành công");
                console.log(err)
            })
    }
    const openUpload = () => {
        refInput.current.click();
    }

    const upload = (e) => {
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
                setImage(images[0].url);
            }
        }).catch(e => console.log(e, "errors"));
    }
    // function setValue(key, value) {
    //     setModel({ ...model, [key]: value })
    // }
    return (
        <div className="card p-5">
            <div className="container">
                <div className="row inbox-wrapper">
                    <div className="col-md-4 card-profile-admin">
                        <div className="avatar__upload" style={{ width: "300px" }} onClick={openUpload}>
                            {
                                image ?
                                    <img src={image} />
                                    :
                                    <img src="https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png" />

                            }
                            <input type="file" name="files" id="files" ref={refInput}
                                onChange={upload}
                                className="avatar__upload-input" />
                        </div>
                    </div>
                    <div className="col-md-8 returning-customer">
                        <ul className="responsive-accordion responsive-accordion-default">
                            <li>
                                <form onSubmit={handleSubmit(submit)}>
                                    <Row gutter={16}>
                                        <Col md={24}>
                                            <Controller
                                                rules={{
                                                    validate: (username) => (
                                                        schema.validate({ username }).catch((e) => e.message))
                                                }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <InputCus
                                                        {...field}
                                                        autoFocus
                                                        name="username"
                                                        label="Tên khách hàng"
                                                        placeholder="Tên khách hàng..."
                                                        error={error}
                                                    />
                                                )}
                                                name="username"
                                                control={control}
                                                defaultValue={item ? item.username : ""}
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col md={24}>
                                            <Controller
                                                rules={{
                                                    validate: (email) => (
                                                        schema.validate({ email }).catch((e) => e.message))
                                                }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <InputCus
                                                        {...field}
                                                        autoFocus
                                                        name="email"
                                                        label="email"
                                                        placeholder="email..."
                                                        error={error}
                                                    />
                                                )}
                                                name="email"
                                                control={control}
                                                defaultValue={item ? item.email : ""}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col md={24}>
                                            <Controller
                                                rules={{
                                                    validate: (phone) => (
                                                        schema.validate({ phone }).catch((e) => e.message))
                                                }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <InputCus
                                                        {...field}
                                                        autoFocus
                                                        name="phone"
                                                        label="Điện thoại"
                                                        placeholder="Điện thoại..."
                                                        error={error}
                                                    />
                                                )}
                                                name="phone"
                                                control={control}
                                                defaultValue={item ? item.profile?.phone : ""}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col md={24}>
                                            <Controller
                                                rules={{
                                                    validate: (address) => (
                                                        schema.validate({ address }).catch((e) => e.message))
                                                }}
                                                render={({ field, fieldState: { error } }) => (
                                                    <InputCus
                                                        {...field}
                                                        autoFocus
                                                        name="address"
                                                        label="Địa chỉ"
                                                        placeholder="Đia chỉ..."
                                                        error={error}
                                                    />
                                                )}
                                                name="address"
                                                control={control}
                                                defaultValue={item ? item.profile?.address : ""}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <label className="mb-1 d-flex" htmlFor={"gender"}>Giới tính</label>
                                        <Controller
                                            rules={{
                                                validate: (gender) => (
                                                    schema.validate({ gender }).catch((e) => e.message))
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                                <Select
                                                    {...field}
                                                    id="gender"
                                                    name="gender"
                                                    placeholder="Chọn giới tính..."
                                                    className="w-100"
                                                    error={error}
                                                >
                                                    {option.map(item => <Option value={item.value}>
                                                        {item.name}
                                                    </Option>)}
                                                </Select>

                                            )}
                                            name="gender"
                                            control={control}
                                            defaultValue={item ? item.profile?.gender : ""}
                                        />
                                    </Row>
                                    <div className="d-flex mt-2">
                                        <Button
                                            text={"Cập nhật"}
                                            className="ml-auto"
                                            onClick={() => handleSubmit(submit)()}
                                        />
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileAdmin
