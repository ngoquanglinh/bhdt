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
import { Tag } from "antd";

const option = [
    { id: 0, name: "Chưa xử lý" },
    { id: 1, name: "Đang xử lý" },
    { id: 2, name: "Đã giao hàng" },
    { id: 3, name: "Khách hủy" },
    { id: 4, name: "Shop hủy" },
]

export default function Cart() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.login.user);
    const login = useSelector(state => state.login.login);
    const orders = useSelector(state => state.orders.orders?.items || []);
    const history = useHistory();

    const [model, setModel] = useState({
        page: 1,
        pageSize: 50,
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

    const renderStatus = (status, item) => {
        switch (status) {
            case 0:
                return (
                    <Fragment>
                        <Tag onClick={() => handleEditOrder(item.id)} color="#ee4d2d">Hủy Đơn</Tag>
                        {/* <sly.PriceButton >Hủy Đơn</sly.PriceButton> */}
                        <Tag color="#6C4A4A">Chưa xử lý</Tag>
                    </Fragment>
                )
            case 1:
                return (
                    <Fragment>
                        {/* <sly.PriceButton onClick={() => handleEditOrder(item.id)}>Hủy Đơn</sly.PriceButton> */}
                        <Tag onClick={() => handleEditOrder(item.id)} color="#6C4A4A">Hủy Đơn</Tag>
                        <Tag color="#F0A500">Đang xử lý</Tag>
                    </Fragment>
                )
            case 2:
                return (
                    <Tag color="#00A19D">Đã giao hàng</Tag>
                )
            case 3:
                return (
                    <Tag color="#bf1f1f">Khách hủy</Tag>
                )
            default:
                return (
                    <Tag color="#52006A">Shop hủy</Tag>
                )
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
                                            <img style={{ borderRadius: "5px" }} src={it.product.images[0].url} alt="" />
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
                            <sly.ProductFooterDate>Ngày tạo: {moment(item.created_at).format('H:m DD/MM/YYYY')}</sly.ProductFooterDate>
                            <div className="d-flex align-items: center;">
                                {/* {
                                    (item.status != 3 && item.status != 4) ?
                                        <sly.PriceButton onClick={() => handleEditOrder(item.id)}>Hủy Đơn</sly.PriceButton>
                                        :
                                        <sly.PriceButton >Đã Hủy</sly.PriceButton>
                                } */}
                                {renderStatus(item.status, item)}
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
