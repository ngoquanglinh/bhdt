import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
function LogoCompany() {
  return (
    <div className="company-logo-section section-top-gap-100 section-fluid">
      <div className="company-logo-wrapper" data-aos="fade-up" data-aos-delay="0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="company-logo-slider default-slider-nav-arrow">
                {/* <!-- Slider main container --> */}
                <div className="swiper-container company-logo-slider">
                  {/* <!-- Additional required wrapper --> */}
                  <div className="swiper-wrapper">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={5}
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-1.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-2.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-3.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-4.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-5.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-6.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-7.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                      {/* <!-- Start Company Logo Single Item --> */}
                      <SwiperSlide><div className="company-logo-single-item swiper-slide">
                        <div className="image"><img className="img-fluid"
                          src="assets/images/company-logo/company-logo-8.png" alt="" /></div>
                      </div>
                      </SwiperSlide>
                      {/* <!-- End Company Logo Single Item --> */}
                    </Swiper>
                  </div>
                </div>
                {/* <!-- If we need navigation buttons --> */}
                <div className="swiper-button-prev d-none d-md-block"></div>
                <div className="swiper-button-next d-none d-md-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoCompany
