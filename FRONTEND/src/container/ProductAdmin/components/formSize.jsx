import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editSize, addNewSize } from '../../../state/actions';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../../components/Input";


function Form({ item, action, showModal, handleClose }) {
    const schema = yup.object().shape({
        name: yup.string().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();

    const submitSucess = (data) => {
        if (action == "add") {
            dispatch(addNewSize(data))
        } else {
            data = {
                ...data, id: item.id
            }
            dispatch(editSize(data))
        }
        handleClose();
    };
    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm kích thước" : "Sửa kích thước"}
                        visible={showModal}
                        footer={null}
                        onCancel={handleClose}>
                        <form onSubmit={handleSubmit(submitSucess)}>
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
                                                label="Kích thước"
                                                placeholder="Tên kích thước..."
                                                error={error}
                                            />
                                        )}
                                        name="name"
                                        control={control}
                                        defaultValue={item ? item.name : ""}
                                    />
                                </Col>
                            </Row>
                            <div className="d-flex mt-2">
                                <Button
                                    text={action == "add" ? "Thêm" : "Sửa"}
                                    className="ml-auto"
                                    onClick={() => handleSubmit(submitSucess)()}
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
