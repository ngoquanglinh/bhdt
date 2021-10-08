import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewCategory, editCategories } from '../../state/actions';
import './CatetgoriesAdmin.scss';
import { Modal, Select, Row, Col } from 'antd';
import Button from "./../../components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../components/Input";


function Form({ item, action, showModal, handleClose }) {
    const schema = yup.object().shape({
        name: yup.string().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });
    const { Option } = Select;
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    const submit = (data) => {
        if (action == "add") {
            dispatch(addNewCategory(data))
        } else {
            data = {
                ...data, id: item.id
            }
            dispatch(editCategories(data))
        }
        handleClose()
    };

    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm danh mục" : "Sửa danh mục"}
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
                                                label="Tên danh mục"
                                                placeholder="Tên danh mục..."
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
                                <label className="mb-1 d-flex" htmlFor={"parentId"}>Danh mục cha</label>
                                <Controller
                                    rules={{
                                        validate: (name) => (
                                            schema.validate({ name }).catch((e) => e.message))
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <Select
                                            {...field}
                                            id="parentId"
                                            name="parentId"
                                            placeholder="Danh mục cha..."
                                            className="w-100"
                                            error={error}
                                        >
                                            {categories?.items?.map(item => <Option value={item.id}>
                                                {item.name}
                                            </Option>)}
                                        </Select>

                                    )}
                                    name="parentId"
                                    control={control}
                                    defaultValue={item ? item.parent_id : ""}
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
