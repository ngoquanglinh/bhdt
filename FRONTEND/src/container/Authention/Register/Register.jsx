import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Button } from './../../../assets/css/until'
import InputPassword from './../../../components/InputPassword/InputPassword'
import InputText from './../../../components/InputText/InputText'
import { path } from './../../../constant/path'
import { rule } from './../../../constant/rule'
import * as sly from './register.stlyed'
import ErrMessage from './../../../components/ErrMessage/ErrMessage'
import Header from './../../../components/Header/Header'
import { useDispatch } from 'react-redux'
import { userLogin, userSingin } from './../../../state/actions';
import { startActionWithPromise } from './../../../Helper/saga-promise-helpers';

function Register() {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confilmpassword: ''
    }
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = async data => {
    const body = {
      username: data.email,
      email: data.email,
      password: data.password,
      c_password: data.confilmpassword,
      role: "customer",
    }
    try {
      const signin = await startActionWithPromise(userSingin, body, dispatch);
      if (signin.success) {
        history.push(path.login)
      }
    } catch (error) {
      if (error.status === 422) {
        for (const key in error.data) {
          setError(key, {
            type: 'server',
            message: error.data[key]
          })
        }
      }
    }
  }
  return (
    <React.Fragment>
      <Header title={"Đăng ký"}></Header>
      <sly.RegisterStyled>
        <sly.Container className="container">
          <sly.Banner src="https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba"></sly.Banner>
          <sly.FormWrapper>
            <sly.Title>Đăng Ký</sly.Title>
            <sly.Form onSubmit={handleSubmit(handleRegister)} noValidate>
              <sly.FormControl>
                <Controller
                  name="email"
                  control={control}
                  rules={rule.email}
                  render={({ field }) => (
                    <InputText
                      type="email"
                      name="email"
                      placeholder="qweaxzxc@gmail.com"
                      onChange={field.onChange}
                      value={getValues('email')}
                    ></InputText>
                  )}
                />
                <ErrMessage errors={errors} name="email" />
              </sly.FormControl>
              <sly.FormControl>
                <Controller
                  name="password"
                  control={control}
                  rules={rule.password}
                  render={({ field }) => (
                    <InputPassword
                      placeholder="Mật khẩu"
                      name="password"
                      onChange={field.onChange}
                      value={getValues('password')}
                    ></InputPassword>
                  )}
                />
                <ErrMessage errors={errors} name="password" />
              </sly.FormControl>
              <sly.FormControl>
                <Controller
                  name="confilmpassword"
                  control={control}
                  rules={{
                    ...rule.confirmpass,
                    validate: {
                      samePassword: v => v === getValues('password') || 'Mật khẩu không khớp'
                    }
                  }}
                  render={({ field }) => (
                    <InputPassword
                      placeholder="Nhập lại mật khẩu"
                      name="confilmpassword"
                      onChange={field.onChange}
                      value={getValues('confilmpassword')}
                    ></InputPassword>
                  )}
                />
                <ErrMessage errors={errors} name="confilmpassword" />
              </sly.FormControl>
              <sly.FormButton>
                <Button type="submit">Đăng Ký</Button>
              </sly.FormButton>
            </sly.Form>
            <sly.FormFooter>
              <span>Bạn đã có tài khoản ? </span>
              <Link to={path.login} className="Link">
                Đăng Nhập
              </Link>
            </sly.FormFooter>
          </sly.FormWrapper>
        </sly.Container>
      </sly.RegisterStyled>
    </React.Fragment>

  )
}
export default Register
