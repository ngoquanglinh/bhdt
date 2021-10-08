import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom';
import './ProductItem.scss';
import { formatPriceVN } from './../../Helper/formatNumberHelper'

function ProductItem(props) {
    return (
        <div className="product-item">
            <div className="product-thumb">
                <div className="main-img">
                    <a href="single-product.html">
                        <img className="img-responsive" src={props.product.images[0]?.url} alt="img" />
                    </a>
                </div>
                <div className="overlay-img">
                    <a href="single-product.html">
                        <img className="img-responsive" src={props.product.images[1]?.url} alt="img" />
                    </a>
                </div>
                {
                    props.product.is_new != 0 &&
                    <div className="product-new">
                        NEW
                    </div>
                }
                {
                    props.product.sale != 0 &&
                    <div className="product-sale">
                        - {props.product.sale} %
                    </div>
                }
                <Link to={"/product/" + props.product.id}>
                    <a href="single-product.html" className="details"><i className="pe-7s-search" /></a>
                </Link>
            </div>
            <h4 className="product-name"><a href="single-product.html">{props.product.name}</a></h4>
            <p className="product-price">{formatPriceVN(props.product.price)}</p>
            <div className="group-buttons">
                <button type="button" className="add-to-cart" data-toggle="tooltip" data-placement="top" title data-bs-original-title="Add to Cart" data-original-title>
                    <span>Thêm vào giỏ</span>
                </button>
            </div>
        </div>
    )
}
export default ProductItem;