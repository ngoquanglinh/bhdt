import React, { Fragment } from 'react'
import {formatPriceVN} from './../../Helper/formatNumberHelper'

function ProductItemSmall(props) {
    return (
        <div className="media">
            <div className="media-left">
                <div className="block-thumb">
                    <div className="main-img">
                        <a href="single-product.html">
                            <img style={{width:110, height:130}} className="img-responsive" src={props.product.images[0]?.url} alt="img" />
                        </a>
                    </div>
                    <div className="overlay-img">
                        <a href="single-product.html">
                            <img style={{width:110, height:130}} className="img-responsive" src={props.product.images[1]?.url} alt="img" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="media-body">
                <h4><a href="single-product.html">{props.product.name}</a></h4>
                <p className="price">{formatPriceVN(props.product.price)}</p>
                <div className="group-buttons">
                    <button type="button" data-toggle="tooltip" data-placement="top" title="Add to Cart">
                        <i className="pe-7s-cart" />
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProductItemSmall;