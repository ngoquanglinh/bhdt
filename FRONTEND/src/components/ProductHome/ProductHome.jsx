import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from './../../state/actions';
import { Link } from 'react-router-dom'
import { addCart } from './../../state/actions';

import './ProductHome.scss';

function ProductHome() {
    const products = useSelector(state => state.products.products);
    const dispatch = useDispatch();
    const [model, setModel] = useState({
        search: "",
        pageSize: 4,
        page: 1
    });
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            dispatch(getAllProduct(model))
        }
        return () => mounted = false;

    }, []);

    const addToCart = (item) => {
        dispatch(addCart({ item, quantity: 1 }));
    }
    return (
        <Fragment>
            <div className="blog-post">
                <div className="container">
                    <h3 className="mb-5">SẢN PHẨM MỚI</h3>
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
                                                        <div className="overlay-img">
                                                            <Link to={`/products/${item.id}`}>
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
                                                            </Link>
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
                </div>
            </div>
        </Fragment>
    )
}
export default ProductHome;