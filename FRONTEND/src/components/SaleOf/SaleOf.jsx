import React, { Fragment, useEffect, useState } from 'react'
import HomeService from '../../services/home/home.service';
import ProductItem from '../ProductItem/ProductItem';
import './SaleOf.scss';

function SaleOf() {
    const [loading, setLoading] = useState(false);
    const [productSales1, setProductSales1] = useState([]);
    const [productSales2, setProductSales2] = useState([]);

    useEffect(() => {

        setLoading(true);
        
        HomeService.getProductSales({ sale: 1, page: 1 })
            .then(data => {
                setProductSales1(data.data?.items);
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false)
            );

        HomeService.getProductSales({ sale: 1, page: 2 })
            .then(data => {
                setProductSales2(data.data?.items);
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false)
            );
    }, []);


    return (
        <Fragment>
            <div className="sale-off">
                <div className="container">
                    <h3>SALE OFF</h3>
                    <h5>Up to 50%</h5>
                    <div id="carousel-2">
                        <div className="box-content">
                            <div className="showcase">
                                <div className="row">
                                    <div className="box-product">
                                        {
                                            loading ?
                                                <div className="product-item" style={{height:452}}>
                                                    <div className="product-thumb">
                                                    </div>
                                                </div> :
                                                productSales1.map((item, index) => (
                                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                                                        <ProductItem
                                                            product={item}
                                                        />
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="showcase">
                                <div className="row">
                                    <div className="box-product">
                                        {
                                            productSales2.map((item, index) => (
                                                <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                                                    <ProductItem
                                                        product={item}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="nav">
                            <span className="prev"><i className="fa fa-angle-left" /></span>
                            <span className="next"><i className="fa fa-angle-right" /></span>
                        </div>
                    </div>
                </div>
            </div>
            {/* /.sale-off */}
        </Fragment>
    )
}
export default SaleOf;