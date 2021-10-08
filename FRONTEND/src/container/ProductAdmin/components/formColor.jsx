import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewColor, editColor } from '../../../state/actions';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../../components/Input";
import Color from './../../../components/Color/Color';


function Form({ item, action, showModal, handleClose }) {
    const schema = yup.object().shape({
        name: yup.string().required("Trường này là bắt buộc"),
        color: yup.string().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const [showColor, setshowColor] = useState(false);
    const [color, setColor] = useState("")

    useEffect(() => {
        if (item) {
            setColor(item.color);
        }
    }, [])

    const submit = (data) => {
        if (action == "add") {
            dispatch(addNewColor(data))
        } else {
            data = {
                ...data, id: item.id
            }
            dispatch(editColor(data))
        }
        handleClose();
    };
    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm màu" : "Sửa màu"}
                        visible={showModal}
                        footer={null}
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
                                                label="Tên tài liệu"
                                                placeholder="Tên tài liệu..."
                                                error={error}
                                            />
                                        )}
                                        name="name"
                                        control={control}
                                        defaultValue={item ? item.name : ""}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col md={24}>
                                    <Controller
                                        rules={{
                                            validate: (color) => (
                                                schema.validate({ color }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <InputCus
                                                {...field}
                                                autoFocus
                                                name="color"
                                                label="Màu"
                                                placeholder="Màu..."
                                                error={error}
                                                value={color}
                                            />
                                        )}
                                        name="color"
                                        control={control}
                                        defaultValue={item ? item.color : ""}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="mt-2"
                                        onClick={() => setshowColor(true)}
                                        style={{
                                            cursor: "pointer", width: "50px", height: "50px",
                                            background: color || "#dc3545"
                                        }}>
                                    </div>
                                </Col>
                                <Col>
                                    {
                                        showColor && (
                                            <Color
                                                color={color}
                                                setshowColor={(v) => setshowColor(v)}
                                                onChange={(v) => setColor(v.hex)}
                                            />
                                        )
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
