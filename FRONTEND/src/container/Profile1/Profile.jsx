import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from './../../utils/helper'
import * as sly from './Cart.styled'
import { useHistory } from "react-router-dom";
import { path } from './../../constant/path';
import { addOrder, removeCart, getAcount } from './../../state/actions';
import { toastError, toastSuccess } from './../../Helper/toastHelper';
import { uploadFiles } from '../../state/actions';
import UserService from '../../services/user.service';
import { Select, Row, Col } from 'antd';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from "./../../components/Button";
import InputCus from "./../../components/Input";

export default function Cart() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login.user);
  const login = useSelector(state => state.login.login);
  const history = useHistory();
  const { Option } = Select;
  const item = useSelector(state => state.login.user);
  const refInput = useRef();
  const [image, setImage] = useState(null);
  const [model, setModel] = useState({
    page: 1,
    pageSize: 20,
    search: "",
    type: 1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!user || !login) {
      history.push(path.login);
    }
  }, []);

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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item.profile?.avatar) {
      setImage(item.profile?.avatar);
    }
  }, [])

  const submit = (data) => {
    data = {
      ...data,
      id: item.id,
      name: data.username,
      avatar: image,
    }
    UserService.editUser(data)
      .then(x => {
        if (x.success) {
          dispatch(getAcount(data.id))
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
  return (
    <div className="container">
      <div className="mt-5">
        <sly.ProductSection>
          <sly.ProductHeader>
            <h3>HỒ SƠ CỦA TÔI</h3>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </sly.ProductHeader>
          <div className="row">
            <div className="col-md-4">
              <div className="avatar__upload" onClick={openUpload}>
                {
                  user ?
                    <img src={image || "https://i.pinimg.com/originals/eb/b0/2a/ebb02aedec9bc74f65e38311c7e14d34.png"} />
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
                <li style={{ border: 'none' }}>
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
        </sly.ProductSection>

      </div>
    </div>
  )
}
