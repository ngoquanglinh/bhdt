import React, { useEffect, useState } from 'react'
import './Login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import { userLogin, getAcount } from '../../state/actions';
import { Row, Col } from 'antd';
import Particles from 'react-particles-js';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputCus from "./../../components/Input";
import Button from "./../../components/Button";

function Login() {
    const token = useSelector(state => state.login.token);
    const login = useSelector(state => state.login.login);
    const account = useSelector(state => state.login.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const schema = yup.object().shape({
        email: yup.string().email("email không hợp lệ").required("Trường này là bắt buộc"),
        password: yup.string().required("Trường này là bắt buộc"),
    });
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const submit = (data) => {
        console.log(data, "dsa");
        dispatch(userLogin(data))
    };
    useEffect(() => {
        if (token && login && account) {
            history.push('/admin/dashboard')
        }
    }, [token]);
    useEffect(() => {
        if (account) {
            dispatch(getAcount(user.id));
        }
    }, []);

    return (
        <React.Fragment>
            <div className="main-wrapper" style={{ position: 'relative', zIndex: '999' }}>
                <div className="page-wrapper full-page" style={{ background: 'transparent' }}>
                    <div className="page-content d-flex align-items-center justify-content-center">
                        <div className="row w-100 mx-0 auth-page" style={{ marginTop: "50px" }}>
                            <div className="col-md-8 col-xl-6 mx-auto">
                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4 pr-md-0">
                                            <div className="auth-left-wrapper">
                                            </div>
                                        </div>
                                        <div className="col-md-8 pl-md-0">
                                            <div className="auth-form-wrapper px-4 py-5">
                                                <a href="#" className="noble-ui-logo d-block mb-2">Admin <span>Manage</span></a>
                                                <h5 className="text-muted font-weight-normal mb-4">Welcome back! Log in to your account.</h5>
                                                <form onSubmit={handleSubmit(submit)}>
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
                                                                defaultValue={""}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={16}>
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
                                                                        name="password"
                                                                        label="password"
                                                                        placeholder="password..."
                                                                        error={error}
                                                                        type={"password"}
                                                                    />
                                                                )}
                                                                name="password"
                                                                control={control}
                                                                defaultValue={""}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <div className="d-flex mt-2">
                                                        <Button
                                                            hotKey="Enter"
                                                            text="Đăng nhập"
                                                            className="ml-auto"
                                                            onClick={() => handleSubmit(submit)()}
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div style={{ position: 'fixed', top: 0, right: 0, left: 0, opacity: 0.9, background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', height: '100%' }}>
                <Particles
                    params={{
                        "particles": {
                            "number": {
                                "value": 50
                            },
                            "size": {
                                "value": 3
                            }
                        },
                        "interactivity": {
                            "events": {
                                "onhover": {
                                    "enable": true,
                                    "mode": "repulse"
                                }
                            }
                        }
                    }} />

            </div>
        </React.Fragment>

    )
}

export default Login
