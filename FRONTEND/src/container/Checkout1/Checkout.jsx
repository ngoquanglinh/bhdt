import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from './../../utils/helper'
import * as sly from './Cart.styled'
import { useHistory } from "react-router-dom";
import { path } from './../../constant/path';
import { addOrder, removeCart } from './../../state/actions';
import { startActionWithPromise as start } from './../../Helper/saga-promise-helpers';
import { toastError, toastSuccess } from './../../Helper/toastHelper';
import { Link } from 'react-router-dom'
import CheckBox from './../../components/BaseCheckBox/CheckBox'

let status = {
    new: 1,
    process: 2,
    success: 3
}

export default function Cart() {
    const dispatch = useDispatch()
    let products = useSelector(state => state.cart.items);
    products = products.filter(item => item.checkout == status.process);
    const user = useSelector(state => state.login.user);
    const login = useSelector(state => state.login.login);
    const history = useHistory();

    const [model, setModel] = useState({
        total: 0,
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        ship_address: "",
        details: [],
        note: "",
        user_id: null,
        type: 1
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user || !login) {
            history.push(path.login);
        } else {
            const itemOrder = products.map(x => {
                return (
                    {
                        "product_id": x.product.id,
                        "quantity": x.quantity,
                        "total": x.product.price - (x.product.price * x.product.discount / 100),
                        "color_id": null,
                        "size_id": null,
                    })
            })
            setModel({
                ...model,
                total: totalPrice(),
                details: itemOrder,
                user_id: user.id,
                username: user.username,
                name: user.username,
                email: user.email,
                address: user.profile ? user.profile.address : null,
                ship_address: user.profile ? user.profile.address : null,
                phone: user.profile ? user.profile.phone : null,
            })
        }
    }, [])

    const handleInputQuantity = indexPurchare => value => {
    }
    const handleBlurQuantity = indexPurchare => async value => {
    }
    const handleIncreseAndDecrese = indexPurchare => async value => {
    }

    const totalPrice = () => {
        if (products.length > 0) {
            return (
                products.reduce((a, c) => {
                    if (c.product.discount) {
                        return [...a, (c.quantity * (c.product.price - (c.product.price * c.product.discount / 100)))]
                    } else {
                        return [...a, (c.quantity * c.product.price)]
                    }
                }, []).reduce((a, c) => parseInt(a + c))
            )
        } else {
            return 0;
        }
    }

    const handleSubmit = async () => {
        try {
            const order = await start(addOrder, model, dispatch);
            if (order.success) {
                toastSuccess("?????t h??ng th??nh c??ng");
                products.map(item => {
                    dispatch(removeCart(item))
                })
                console.log(order, "order");
                history.push('/user/purchase/order/' + order.data.id);
            }
        } catch (error) {
            console.log(error, "error");
            toastError("?????t h??ng kh??ng th??nh c??ng")
        }
    }
    if (!user) return null;

    const check = model.address && model.phone;

    return (
        <div className="container">
            <div>
                {
                    !check &&
                    <div className="alert alert-primary mt-3" style={{
                        background: " #f03f3f",
                        color: "white"
                    }} role="alert">
                        B???n c???n c???p nh???t th??ng tin  <Link style={{ textDecoration: "underline", color: "white" }}
                            to={path.profile}>t???i ????y</Link> ????? ti???n h??nh thanh to??n
                    </div>
                }
                <sly.ProductHeader>
                    <sly.ProductHeaderTitle>?????a Ch??? Nh???n H??ng</sly.ProductHeaderTitle>
                    <p>{user.username + " " + "(+84)" + user.profile?.phone + " " + user.profile?.address}</p>
                </sly.ProductHeader>
                <sly.ProductSection>
                    <sly.ProductHeader1>
                        <sly.ProductHeaderTitle>S???n ph???m</sly.ProductHeaderTitle>
                        <sly.ProductHeaderUntitPrice>????n gi??</sly.ProductHeaderUntitPrice>
                        <sly.ProductHeaderQuantity>S??? l?????ng</sly.ProductHeaderQuantity>
                        <sly.ProductHeaderTotalPrice>Th??nh ti???n</sly.ProductHeaderTotalPrice>
                    </sly.ProductHeader1>
                    {products.map((item, index) => (
                        <sly.CartItem key={index}>
                            <sly.CartItemOverview>
                                <sly.CartItemOverviewImage to="">
                                    <img src={item.product.images[0].url} alt="" />
                                </sly.CartItemOverviewImage>
                                <sly.CartItemOverviewNameWraper>
                                    <sly.CartItemOverviewName>{item.product.name}</sly.CartItemOverviewName>
                                </sly.CartItemOverviewNameWraper>
                            </sly.CartItemOverview>
                            <sly.CartItemUnitPrice>
                                {
                                    item.product.discount > 0 ?
                                        <Fragment>
                                            <span>??{formatMoney(item.product.price - (item.product.price * item.product.discount / 100))}</span>
                                            <span>??{formatMoney(item.product.price)}</span>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            ??{formatMoney(item.product.price)}
                                        </Fragment>
                                }

                            </sly.CartItemUnitPrice>
                            <sly.CartitemTotalPrice>
                                <span>{item.quantity}</span>
                            </sly.CartitemTotalPrice>
                            <sly.CartitemTotalPrice>
                                <span className="ml-10">
                                    ???{formatMoney((item.quantity * (item.product.price - (item.product.price * item.product.discount / 100))))}
                                </span>
                            </sly.CartitemTotalPrice>
                        </sly.CartItem>
                    ))}
                    <div>
                        <h4>H??nh th???c thanh to??n</h4>
                        <div>
                            <div className="d-flex align-items-center">
                                <CheckBox
                                    onChange={() => toastError("Ch???c n??ng ch??a tri???n khai")}
                                    checked={false} />
                                <span className="ml-1">Thanh to??n qua th???</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <CheckBox
                                    checked={true} />
                                <span className="ml-1">Thanh to??n khi giao h??ng</span>
                            </div>
                        </div>
                    </div>
                </sly.ProductSection>
            </div>
            <sly.CartFooter>
                <sly.CartFooterPrice>
                    <sly.CartFooterPriceTop>
                        <div>T???ng thanh to??n ({products.length} s???n ph???m)</div>
                        <div>???{formatMoney(totalPrice())}</div>
                    </sly.CartFooterPriceTop>
                </sly.CartFooterPrice>
                <sly.CartFooterCheckout disabled={!check} onClick={handleSubmit}>?????t h??ng</sly.CartFooterCheckout>
            </sly.CartFooter>
        </div >
    )
}
