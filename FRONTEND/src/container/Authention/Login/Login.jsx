import React from 'react'
import * as sly from './../Register/register.stlyed'
import { Controller, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import InputPassword from './../../../components/InputPassword/InputPassword'
import InputText from './../../../components/InputText/InputText'
import { Button } from './../../../assets/css/until'
import ErrMessage from './../../../components/ErrMessage/ErrMessage'
import { path } from './../../../constant/path'
import { rule } from './../../../constant/rule'
import { useDispatch } from 'react-redux';
import Header from './../../../components/Header/Header'
import { startActionWithPromise } from './../../../Helper/saga-promise-helpers';
import { userLogin, userSingin } from './../../../state/actions';
function Login() {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async data => {
    const body = {
      email: data.email,
      password: data.password
    }

    try {
      const login = await startActionWithPromise(userLogin, body, dispatch);
      if (login.user) {
        history.push(path.home)
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
      <Header title={"Đăng Nhập"}></Header>
      <sly.RegisterStyled>
        <sly.Container className="container">
          <sly.Banner src="https://cf.shopee.vn/file/5569eb9dc7e09e2dbed5315b8f2ea8ba"></sly.Banner>
          <sly.FormWrapper>
            <sly.Title>Đăng Nhập</sly.Title>
            <sly.Form onSubmit={handleSubmit(handleLogin)} noValidate>
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

              <sly.FormButton>
                <Button type="submit">Đăng Nhập</Button>
              </sly.FormButton>
            </sly.Form>
            <sly.FormFooter>
              <span>Bạn chưa có tài khoản ? </span>
              <Link to={path.register} className="Link">
                Đăng Nhập
              </Link>
            </sly.FormFooter>
          </sly.FormWrapper>
        </sly.Container>
      </sly.RegisterStyled>
    </React.Fragment>

  )
}
export default Login
