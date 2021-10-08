import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
function Latest() {
  return (
    <div className="blog-default-slider-section section-top-gap-100 section-fluid">
      {/* <!-- Start Section Content Text Area --> */}
      <div className="section-title-wrapper" data-aos="fade-up" data-aos-delay="0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-content-gap">
                <div className="secton-content">
                  <h3 className="section-title">THE LATEST BLOGS</h3>
                  <p>Present posts in a best way to highlight interesting moments of your blog.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Start Section Content Text Area --> */}
      <div className="blog-wrapper" data-aos="fade-up" data-aos-delay="200">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="blog-default-slider default-slider-nav-arrow">
                {/* <!-- Slider main container --> */}
                <div className="swiper-container blog-slider">
                  {/* <!-- Additional required wrapper --> */}
                  <div className="swiper-wrapper">
                    {/* <!-- Start Product Default Single Item --> */}
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={3}
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      <SwiperSlide><div className="blog-default-single-item blog-color--green swiper-slide">
                        <div className="image-box">
                          <a href="blog-single-sidebar-left.html" className="image-link">
                            <img className="img-fluid"
                              src="assets/images/blog/blog-grid-home-1-img-1.jpg" alt="" />
                          </a>
                        </div>
                        <div className="content">
                          <h6 className="title"><a href="blog-single-sidebar-left.html">Blog Post One</a>
                          </h6>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                                                Aenean posuere libero eu augue condimentum rhoncus. Praesent</p>
                          <div className="inner">
                            <a href="blog-single-sidebar-left.html"
                              className="read-more-btn icon-space-left">Read More <span><i
                                className="ion-ios-arrow-thin-right"></i></span></a>
                            <div className="post-meta">
                              <a href="#" className="date">24 Apr</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      </SwiperSlide>

                      <SwiperSlide><div className="blog-default-single-item blog-color--green swiper-slide">
                        <div className="image-box">
                          <a href="blog-single-sidebar-left.html" className="image-link">
                            <img className="img-fluid"
                              src="assets/images/blog/blog-grid-home-1-img-2.jpg" alt="" />
                          </a>
                        </div>
                        <div className="content">
                          <h6 className="title"><a href="blog-single-sidebar-left.html">Blog Post Two</a>
                          </h6>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                                                Aenean posuere libero eu augue condimentum rhoncus. Praesent</p>
                          <div className="inner">
                            <a href="#" className="read-more-btn icon-space-left">Read More <span><i
                              className="ion-ios-arrow-thin-right"></i></span></a>
                            <div className="post-meta">
                              <a href="blog-single-sidebar-left.html" className="date">24 Apr</a>
                            </div>
                          </div>
                        </div>
                      </div>

                      </SwiperSlide>
                      <SwiperSlide><div className="blog-default-single-item blog-color--green swiper-slide">
                        <div className="image-box">
                          <a href="blog-single-sidebar-left.html" className="image-link">
                            <img className="img-fluid"
                              src="assets/images/blog/blog-grid-home-1-img-3.jpg" alt="" />
                          </a>
                        </div>
                        <div className="content">
                          <h6 className="title"><a href="blog-single-sidebar-left.html">Blog Post
                                                    Three</a></h6>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                                                Aenean posuere libero eu augue condimentum rhoncus. Praesent</p>
                          <div className="inner">
                            <a href="blog-single-sidebar-left.html"
                              className="read-more-btn icon-space-left">Read More <span><i
                                className="ion-ios-arrow-thin-right"></i></span></a>
                            <div className="post-meta">
                              <a href="#" className="date">24 Apr</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      </SwiperSlide>


                      <SwiperSlide><div className="blog-default-single-item blog-color--green swiper-slide">
                        <div className="image-box">
                          <a href="blog-single-sidebar-left.html" className="image-link">
                            <img className="img-fluid"
                              src="assets/images/blog/blog-grid-home-1-img-4.jpg" alt="" />
                          </a>
                        </div>
                        <div className="content">
                          <h6 className="title"><a href="blog-single-sidebar-left.html">Blog Post Four</a>
                          </h6>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                                                Aenean posuere libero eu augue condimentum rhoncus. Praesent</p>
                          <div className="inner">
                            <a href="blog-single-sidebar-left.html"
                              className="read-more-btn icon-space-left">Read More <span><i
                                className="ion-ios-arrow-thin-right"></i></span></a>
                            <div className="post-meta">
                              <a href="#" className="date">24 Apr</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      </SwiperSlide>


                      <SwiperSlide><div className="blog-default-single-item blog-color--green swiper-slide">
                        <div className="image-box">
                          <a href="blog-single-sidebar-left.html" className="image-link">
                            <img className="img-fluid"
                              src="assets/images/blog/blog-grid-home-1-img-5.jpg" alt="" />
                          </a>
                        </div>
                        <div className="content">
                          <h6 className="title"><a href="blog-single-sidebar-left.html">Blog Post Five</a>
                          </h6>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                                                Aenean posuere libero eu augue condimentum rhoncus. Praesent</p>
                          <div className="inner">
                            <a href="blog-single-sidebar-left.html"
                              className="read-more-btn icon-space-left">Read More <span><i
                                className="ion-ios-arrow-thin-right"></i></span></a>
                            <div className="post-meta">
                              <a href="#" className="date">24 Apr</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      </SwiperSlide>


                      <SwiperSlide><div className="blog-default-single-item blog-color--green swiper-slide">
                        <div className="image-box">
                          <a href="blog-single-sidebar-left.html" className="image-link">
                            <img className="img-fluid"
                              src="assets/images/blog/blog-grid-home-1-img-6.jpg" alt="" />
                          </a>
                        </div>
                        <div className="content">
                          <h6 className="title"><a href="blog-single-sidebar-left.html">Blog Post Six</a>
                          </h6>
                          <p>Donec vitae hendrerit arcu, sit amet faucibus nisl. Cras pretium arcu ex.
                                                Aenean posuere libero eu augue condimentum rhoncus. Praesent</p>
                          <div className="inner">
                            <a href="blog-single-sidebar-left.html"
                              className="read-more-btn icon-space-left">Read More <span><i
                                className="ion-ios-arrow-thin-right"></i></span></a>
                            <div className="post-meta">
                              <a href="#" className="date">24 Apr</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      </SwiperSlide>



                    </Swiper>
                  </div>

                </div>
                {/* <!-- If we need navigation buttons --> */}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Latest
