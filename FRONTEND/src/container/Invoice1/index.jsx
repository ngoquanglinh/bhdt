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
import {
    useParams
} from "react-router-dom";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Loading } from '../../components/GlobalLoading';

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
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState({
        page: 1,
        pageSize: 50,
        search: "",
        type: 1,
        userId: null
    });

    const [order, setOrder] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!user || !login) {
            history.push(path.login);
        }
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await OrdersServices.getOrder(id);
            if (data.success) {
                setOrder(data.data);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const handleEditOrder = async () => {
        const data = { ...order, status: 0 };
        try {
            setLoading(true);
            const x = await OrdersServices.editOrder(data);
            if (x.success) {
                toastSuccess("cập nhật thành công");
                getData();
                setLoading(false)
            } else {
                toastError("cập nhật không thành công");
                setLoading(false)
            }
        } catch (e) {
            toastError("cập nhật không thành công");
            setLoading(false)
        }
    }
    if (loading) return <Loading show={true} />
    if (!order) return null;
    return (
        <div className="container">
            <div className="mt-5">
                <sly.ProductSection>
                    <div className="d-flex pointer" onClick={() => history.push(path.purchase)}>
                        <ArrowLeftOutlined className="mt-1" />
                        <span className="ml-1">Quay lại</span>
                    </div>
                    <sly.ProductHeader1>
                        <sly.ProductHeaderTitle>
                            <sly.ProductFooterDate>Ngày tạo: {moment(order.created_at).format('H:m DD/MM/YYYY')}</sly.ProductFooterDate>
                        </sly.ProductHeaderTitle>
                        <sly.ProductHeaderTotalPrice>
                            <sly.ProductHeaderTotalPrice>Mã đơn hàng: {"BH" + ("00000" + order.id).slice(-8)}</sly.ProductHeaderTotalPrice>
                            {
                                (order.status == 3 || order.status == 4) &&
                                <sly.ProductHeaderTotalPrice1 className="ml-2">| Đơn hàng đã bị hủy</sly.ProductHeaderTotalPrice1>
                            }
                        </sly.ProductHeaderTotalPrice>
                    </sly.ProductHeader1>
                    <hr />

                    {
                        (order.status == 3 || order.status == 4) &&
                        <div className="alert alert-light d-flex justify-content-between align-items-center" role="alert">
                            <div>
                                Bạn đã hủy đơn hàng này
                            </div>
                            <div>
                                <button onClick={() => handleEditOrder()} style={{
                                    width: "100px",
                                    height: "34px",
                                    background: "#ee4d2d",
                                    color: "white"
                                }}>Mua Lại</button>
                            </div>
                        </div>
                    }

                    <div>
                        <h2 className="ml-1">Địa Chỉ Nhận Hàng</h2>
                        <div className="ml-1">
                            <p className="mb-0">{order.customer.username}</p>
                            <p className="mb-0"> {order.customer?.profile?.phone}</p>
                            <p className="mb-0">{order.customer?.profile?.address}</p>
                        </div>
                    </div>
                    {
                        order.order_items.map((it, id) =>
                            <sly.CartItem key={id}>
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
                        <sly.ProductFooterDate></sly.ProductFooterDate>
                        <div className="d-flex align-items: center;">
                            {/* {renderStatus(order.status, order)} */}
                            <sly.ProductFooterTotalPrice>Tổng tiền: ₫{formatMoney(order.total)}</sly.ProductFooterTotalPrice>
                        </div>
                    </sly.ProductFooter>
                    <small className="ml-auto">Thanh toán khi nhận hàng</small>
                    <div className="alert alert-primary" role="alert">
                        Vui lòng thanh toán ₫{formatMoney(order.total)} khi nhận hàng.
                    </div>
                </sly.ProductSection>
            </div>
        </div>
    )
}
