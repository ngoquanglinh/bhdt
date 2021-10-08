import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editCustomer, addNewCustomer } from '../../../state/actions';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../../components/Input";
import moment from 'moment';

function Form({ item, action, showModal, handleClose }) {
    let schema;
    if (action == "add") {
        schema = yup.object().shape({
            username: yup.string().required("Trường này là bắt buộc"),
            email: yup.string().email("Email chưa chính xác").required("Trường này là bắt buộc"),
            password: yup.string().required("Trường này là bắt buộc"),
            c_password: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu chưa chính xác').required("Trường này là bắt buộc"),
            phone: yup.string().required("Trường này là bắt buộc"),
            gender: yup.string().required("Trường này là bắt buộc"),
        });
    } else {
        schema = yup.object().shape({
            username: yup.string().required("Trường này là bắt buộc"),
            email: yup.string().email("Email chưa chính xác").required("Trường này là bắt buộc"),
            phone: yup.string().required("Trường này là bắt buộc"),
            gender: yup.string().required("Trường này là bắt buộc"),
        });
    }

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const { Option } = Select;

    const submit = (data) => {

        data = {
            ...data,
            birthday: action == "add" ? moment() : null,
            name: data.username
        }
        if (action == "add") {
            dispatch(addNewCustomer(data))
        } else {
            data = {
                ...data, id: item.id
            }
            dispatch(editCustomer(data))
        }
        handleClose();
    };

    const option = [
        { id: 1, name: "Nam" },
        { id: 2, name: "Nữ" },
        { id: 3, name: "Khác" },
    ]
    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm khách hàng" : "Sửa khách hàng"}
                        visible={showModal}
                        footer={null}
                        onCancel={handleClose}>
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
                            {
                                action == "add" && (
                                    <>
                                        <Row className="mt-1">
                                            <Col md={24}>
                                                <Controller
                                                    rules={{
                                                        validate: (password) => (
                                                            schema.validate({ password }).catch((e) => e.message))
                                                    }}
                                                    render={({ field, fieldState: { error } }) => (
                                                        <InputCus
                                                            {...field}
                                                            autoFocus
                                                            type="password"
                                                            name="password"
                                                            label="Mật khẩu"
                                                            placeholder="Mật khẩu..."
                                                            error={error}
                                                        />
                                                    )}
                                                    name="password"
                                                    control={control}
                                                    defaultValue={item ? item.password : ""}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
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
                                                            type="password"
                                                            name="c_password"
                                                            label="Nhập lại mật khẩu"
                                                            placeholder="Nhập lại mật khẩu..."
                                                            error={error}
                                                        />
                                                    )}
                                                    name="c_password"
                                                    control={control}
                                                    defaultValue={item ? item.c_password : ""}
                                                />
                                            </Col>
                                        </Row>
                                    </>
                                )
                            }
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
                                            {option.map(item => <Option value={item.id}>
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
