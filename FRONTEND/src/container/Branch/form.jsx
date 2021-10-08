import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewBranch, editBranches } from '../../state/actions';
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
    const items = useSelector(state => state.brands.items);

    const submit = (data) => {
        if (action == "add") {
            dispatch(addNewBranch(data))
        } else {
            data = {
                ...data, id: item.id
            }
            dispatch(editBranches(data))
        }
        handleClose()
    };

    return (
        <Fragment>
            {
                !!showModal && (
                    <Modal title={action == "add" ? "Thêm chi nhánh" : "Sửa chi nhánh"}
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
                                                label="Tên chi nhánh"
                                                placeholder="Tên chi nhánh..."
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
