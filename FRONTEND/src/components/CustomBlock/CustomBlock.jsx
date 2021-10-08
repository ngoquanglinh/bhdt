import React, { Fragment, useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import HomeService from '../../services/home/home.service';
import ProductItemSmall from '../ProductItemSmall/ProductItemSmall';
import './CustomBlock.scss';

function CustomBlock() {

  const [loading, setLoading] = useState(false);
  const [productNews, setProductNews] = useState([]);
  const [productFeature, setProductFEATURE] = useState([]);
  const [productTopRate, setProductTopRate] = useState([]);

  useEffect(() => {

    setLoading(true);

    HomeService.getProductNew({ isNew: 1, pageSize: 2 })
      .then(data => {
        setProductNews(data.data?.items);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false)
      );


    HomeService.getProductTrending({ category: "FEATURE" }, 2)
      .then(data => {
        setProductFEATURE(data.data?.items);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false)
      );

    HomeService.getProductTopRate()
      .then(data => {
        setProductTopRate(data.data?.items);
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false)
      );

  }, []);


  return (
    <Fragment>
      <div className="custom-blocks">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="block-item">
                <h3>NEW-IN</h3>
                <div className="row">
                  {
                    loading ?
                      <Loading isOpenLoading={loading} />
                      :
                      productNews.map((item, index) => (
                        <div key={index} className="col-md-12 col-sm-6">
                          <ProductItemSmall product={item} />
                        </div>
                      ))
                  }
                </div>
              </div>
              {/* /.new-in */}
            </div>
            <div className="col-md-4">
              <div className="block-item">
                <h3>FEATURED</h3>
                <div className="row">
                  {
                    loading ?
                      <Loading isOpenLoading={loading} />
                      :
                      productFeature.map((item, index) => (
                        <div key={index} className="col-md-12 col-sm-6">
                          <ProductItemSmall product={item} />
                        </div>
                      ))
                  }
                </div>
              </div>
              {/* /.featured */}
            </div>
            <div className="col-md-4">
              <div className="block-item">
                <h3>TOP RATED</h3>
                <div className="row">
                  {
                    loading ?
                      <Loading isOpenLoading={loading} />
                      :
                      productFeature.map((item, index) => (
                        <div key={index} className="col-md-12 col-sm-6">
                          <ProductItemSmall product={item} />
                        </div>
                      ))
                  }
                </div>
              </div>
              {/* /.top-rated */}
            </div>
          </div>
        </div>
      </div>
      {/* /.custom-blocks */}
    </Fragment>
  )
}
export default CustomBlock;