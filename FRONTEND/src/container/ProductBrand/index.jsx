import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addCart, getAllProduct } from './../../state/actions';
import { Pagination, Spin, Space } from 'antd';
import './index.scss';
import Paginate from "./../../components/Paginate";
import {
    useParams
} from "react-router-dom";

function Category(props) {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.data);
    const products = useSelector(state => state.products?.products);
    let { name, id } = useParams();

    const [model, setModel] = useState({
        page: 1,
        pageSize: 8,
        search: "",
        sort: 0,
        brandId: id
    })

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllProduct(model))
        }
        return () => mounted = false;
    }, []);

    useEffect(() => {
        setModel({ ...model });
    }, [id]);

    useEffect(() => {
        dispatch(getAllProduct(model))
    }, [model]);

    const addToCart = (item) => {
        dispatch(addCart({ item, quantity: 1 }));
    }
    const changPage = async (v) => {
        await setModel({
            ...model,
            page: v
        });
    }
    const changeSort = (e) => {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <div className="main">
                <div className="container">
                    <div className="header-page">
                        <h1>{name}</h1>
                    </div>
                    <div className="main-content">
                        <div className="top-products d-flex justify-content-between">
                            <div className="showing-results">
                                hiển thị {1}–{model.pageSize} trên {products?.total || 0} kết quả
                            </div>
                            <div >
                                <select name="sort" onChange={changeSort} style={{ minWidth: "100px" }}>
                                    <option value={0}>mặc định</option>
                                    <option value={1}>Giá: thấp đến cao</option>
                                    <option value={2}>Giá: cao đến thấp</option>
                                </select>
                            </div>
                        </div>
                        <div className="box-product row">
                            {
                                products?.items?.length == 0 ?
                                    <p>Không có sản phẩm nào</p>
                                    :
                                    products?.items?.map((item, index) => {
                                        return (
                                            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                                                <div className="product-item">
                                                    <div className="product-thumb">
                                                        <div className="main-img">
                                                            <Link to={`/products/${item.id}`}>
                                                                {
                                                                    item.images.length > 0 ?
                                                                        <img className="img-responsive" src={`${item.images[0].url}`} alt="img" />
                                                                        :
                                                                        <img className="img-responsive" src="assets/images/product-img-1.jpg" alt="img" />
                                                                }
                                                            </Link>
                                                        </div>
                                                        <Link to={`/products/${item.id}`}>
                                                            <div className="overlay-img" style={{ cursor: "pointer" }}>
                                                                {
                                                                    item.images.length > 0 ?
                                                                        (
                                                                            item.images.length > 1 ?
                                                                                <img className="img-responsive" src={`${item.images[1].url}`} alt="img" />
                                                                                :
                                                                                <img className="img-responsive" src={`${item.images[0].url}`} alt="img" />
                                                                        )
                                                                        :
                                                                        <img className="img-responsive" src="assets/images/product-img-1.jpg" alt="img" />
                                                                }
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <Link to={`/products/${item.id}`}>
                                                        <h4 className="product-name">
                                                            {item.name}
                                                        </h4>
                                                    </Link>
                                                    {
                                                        item.discount > 0 ?
                                                            <p className="product-price">
                                                                <span style={{ textDecoration: "line-through" }}>
                                                                    {item.price.toLocaleString() + " VND"}
                                                                </span>
                                                                <span className="ml-1">
                                                                    {(item.price - (item.price * item.discount / 100)).toLocaleString() + " VND"}
                                                                </span>
                                                            </p>
                                                            :
                                                            <p className="product-price">
                                                                {item.price.toLocaleString() + " VND"}
                                                            </p>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })

                            }
                        </div>
                        <Paginate
                            total={products?.total || 0}
                            page={model.page}
                            pageSize={model.pageSize}
                            numberButtons={5}
                            onChange={(v) => changPage(v)}
                        />
                    </div>
                </div>
            </div>
            {/* /.main */}
        </div >
    )
}

export default Category
