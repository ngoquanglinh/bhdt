import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles, addNewProduct, addNewOrder } from '../../../state/actions';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../../components/Input";
import ImageProduct from './../../../components/ImageProduct/ImageProduct';
import ProductSelect from "./productSelect";
import moment from 'moment';
import { formatMoney } from './../../../utils/helper'
import { InputNumber } from 'antd';

function Form({ action, showModal, handleClose, type }) {
    const { Option } = Select;
    const schema = yup.object().shape({
        username: yup.string().required("Trường này là bắt buộc"),
        // warehouseId: yup.number().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const dispatch = useDispatch();
    const warehouses = useSelector(state => state.warehouses.items);
    const user = useSelector(state => state.login.user);

    const [keySelect, setKeySelect] = useState(moment())
    const [model, setModel] = useState({
        email: "",
        name: "",
        note: "",
        phone: "",
        ship_address: "",
        total: 0,
        user_id: "",
        username: "",
        address: "",
        details: [],
        type: type
    });

    useEffect(() => {
        if (user) {
            setModel({
                ...model,
                user_id: user.id,
                email: user.email,
                name: user.username,
                username: user.username,
                phone: user.profile ? user.profile.phone : "",
                address: user.profile ? user.profile.address : "",
                ship_address: "xxx",
                warehouseId: warehouses.length > 0 ? warehouses[0].id : ""
            })
        }
    }, [])

    const submit = (data) => {

        if (action == "add") {
            if (model.details.length > 0) {
                dispatch(addNewOrder(model))
            }
        } else {

        }
        if (handleClose) {
            handleClose();
        }
    };

    const handleProduct = (id, item) => {
        const index = model.details.findIndex(x => x.product_id == id);
        let details = model.details;
        if (index >= 0) {
            details[index].quantity = details[index].quantity + 1;
            details[index].total = item.discount ?
                parseFloat(details[index].total + (1 * (item.price - (item.price * item.discount / 100))))
                :
                parseFloat(details[index].total + (1 * item.price));
        } else {
            details = [
                ...details,
                {
                    quantity: 1,
                    name: item.name,
                    total: item.discount ?
                        (1 * (item.price - (item.price * item.discount / 100)))
                        :
                        (1 * item.price),
                    color_id: item.colors.length > 0 ? item.colors[0].id : null,
                    product_id: item.id,
                    size_id: item.sizes.length > 0 ? [0].id : null,
                }
            ]
        }
        setModel({
            ...model,
            total: details.reduce((total, item) => item.total + total, 0),
            details: details
        });
        setKeySelect(moment());
    }

    const onChange = (v, product) => {
        const index = model.details.findIndex(item => item.product_id == product.product_id);
        if (index >= 0) {
            model.details[index].quantity = v;
            setModel(model);
        }
    }

    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? type == 2 ? "phiếu nhập" : "Phiếu xuất" : "Sửa phiếu nhập"}
                        visible={showModal}
                        footer={null}
                        width={768}
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
                                                label="Người tạo"
                                                error={error}
                                                disabled
                                            />
                                        )}
                                        name="username"
                                        control={control}
                                        defaultValue={user ? user.username : ""}
                                    />
                                </Col>
                            </Row>

                            {/* <Row gutter={16} >
                                <Col md={24}>
                                    <label className="mb-1 d-flex" htmlFor={"warehouseId"}>Kho hàng</label>
                                    <Controller
                                        rules={{
                                            validate: (warehouseId) => (
                                                schema.validate({ warehouseId }).catch((e) => e.message))
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <Select
                                                {...field}
                                                id="warehouseId"
                                                name="warehouseId"
                                                placeholder="Chi nhánh..."
                                                className="w-100"
                                                error={error}
                                            >
                                                {warehouses.map(item => <Option value={item.id}>
                                                    {item.name}
                                                </Option>)}
                                            </Select>

                                        )}
                                        name="warehouseId"
                                        control={control}
                                        defaultValue={warehouses.length > 0 ? warehouses[0].id : ""}
                                    />
                                </Col>
                            </Row> */}
                            <Row gutter={16}>
                                <Col md={24}>
                                    <ProductSelect
                                        key={keySelect}
                                        onChange={(id, item) => handleProduct(id, item)}
                                        placeholder="Chọn sản phẩm"
                                    />
                                </Col>
                            </Row>
                            {
                                model.details.length > 0 &&
                                <Row>
                                    <table className="table-hover table mt-2">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên sp</th>
                                                <th>Số lượng</th>
                                                <th>Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                model.details.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>
                                                                <InputNumber min={1} defaultValue={item.quantity}
                                                                    onChange={(v) => onChange(v, item)} />
                                                            </td>
                                                            <td>₫{formatMoney(item.total)}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Row>
                            }
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
