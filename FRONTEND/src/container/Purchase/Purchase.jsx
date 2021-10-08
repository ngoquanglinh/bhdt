import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatMoney } from './../../utils/helper'
import * as sly from './Cart.styled'
import { useHistory } from "react-router-dom";
import { path } from './../../constant/path';
import { getListOrder, } from './../../state/actions';
import OrdersServices from "./../../services/orders.services";
import moment from 'moment';
import { toastError, toastSuccess } from './../../Helper/toastHelper';

const option = [
    { id: 0, name: "Chưa xử lý" },
    { id: 1, name: "Đang xử lý" },
    { id: 2, name: "Đã xử lý" },
    { id: 3, name: "Khách hủy" },
    { id: 4, name: "Shop hủy" },
]

export default function Cart() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login.user);
    const login = useSelector(state => state.login.login);
    const orders = useSelector(state => state.orders.orders.items);
    const history = useHistory();

    const [model, setModel] = useState({
        page: 1,
        pageSize: 20,
        search: "",
        type: 1,
        userId: null
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user || !login) {
            history.push(path.login);
        }
        dispatch(getListOrder({ ...model, userId: user.id }))
    }, []);

    const handleEditOrder = (id) => {
        let data = orders.find(x => x.id == id);
        if (data) {
            data = { ...data, status: 3 };
            OrdersServices.editOrder(data).then(x => {
                if (x.success) {
                    toastSuccess("cập nhật thành công");
                    dispatch(getListOrder(model))
                } else {
                    toastError("cập nhật không thành công");
                }
            }).catch(e => {
                toastError("cập nhật không thành công");
            })
        }
    }


    return (
        <div className="container">
            {orders.map((item, index) =>
                <div className="mt-5">
                    <sly.ProductSection>
                        <sly.ProductHeader1>
                            <sly.ProductHeaderTitle>Sản phẩm</sly.ProductHeaderTitle>
                            <sly.ProductHeaderTotalPrice>Thành tiền</sly.ProductHeaderTotalPrice>
                        </sly.ProductHeader1>
                        {
                            item.order_items.map((it, id) =>
                                <sly.CartItem key={index}>
                                    <sly.CartItemOverview>
                                        <sly.CartItemOverviewImage to="">
                                            <img src={it.product.images[0].url} alt="" />
                                        </sly.CartItemOverviewImage>
                                        <sly.CartItemOverviewNameWraper>
                                            <sly.CartItemOverviewName>{it.product.name}</sly.CartItemOverviewName>
                                            <sly.CartItemOverviewName>{"x" + it.quantity}</sly.CartItemOverviewName>
                                        </sly.CartItemOverviewNameWraper>
                                    </sly.CartItemOverview>
                                    <sly.CartitemTotalPrice>
                                        ₫{formatMoney((it.quantity * (it.product.price - (it.product.price * it.product.discount / 100))))}
                                    </sly.CartitemTotalPrice>
                                </sly.CartItem>
                            )
                        }
                        <sly.ProductFooter>
                            <sly.ProductFooterDate>Ngày tạo: {moment(item.created_at).format('L HH:mm')}</sly.ProductFooterDate>
                            <div className="d-flex align-items: center;">
                                {
                                    (item.status != 3 && item.status != 4) ?
                                        <sly.PriceButton onClick={() => handleEditOrder(item.id)}>Hủy Đơn</sly.PriceButton>
                                        :
                                        <sly.PriceButton >Đã Hủy</sly.PriceButton>
                                }
                                <sly.ProductFooterTotalPrice>Tổng tiền: ₫{formatMoney(item.total)}</sly.ProductFooterTotalPrice>
                            </div>
                        </sly.ProductFooter>
                    </sly.ProductSection>
                </div>
            )}

            {/* <sly.CartFooter>
        <sly.CartFooterPrice>
          <sly.CartFooterPriceTop>
            <div>Tổng thanh toán ({orders.length} sản phẩm)</div>
            <div>₫{formatMoney(0)}</div>
          </sly.CartFooterPriceTop>
        </sly.CartFooterPrice>
        <sly.CartFooterCheckout >Đặt hàng</sly.CartFooterCheckout>
      </sly.CartFooter> */}
        </div>
    )
}
