import React from 'react'

function ShowNow() {
  return (
    <div className="banner-section section-top-gap-100">
      <div className="banner-wrapper clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* <!-- Start Banner Single Item --> */}
              <div className="banner-single-item banner-style-13 banner-color--green" data-aos="fade-up"
                data-aos-delay="0">
                <div className="image">
                  <img src="assets/images/banner/banner-style-13-img-1.jpg" alt="" />
                  <div className="content">
                    <div className="text">
                      <h5 className="sub-title">SALE 15% OFF YOUR 1ST PURCHASE</h5>
                      <h2 className="title">HONO ORGANIC SKIN CARE</h2>

                      <a href="product-details-default.html"
                        className="btn btn-lg btn-green icon-space-left"><span
                          className="d-flex align-items-center">Shop Now <i
                            className="ion-ios-arrow-thin-right"></i></span></a>
                    </div>
                  </div>
                </div>

              </div>
              {/* <!-- End Banner Single Item --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowNow
