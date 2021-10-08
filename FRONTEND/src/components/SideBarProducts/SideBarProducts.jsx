import React from 'react'
import { useSelector } from 'react-redux';

function SideBarProducts() {
  const categories = useSelector(state => state.categories.data);
  return (
    <div className="siderbar-section" data-aos="fade-up" data-aos-delay="0">

      {/* <!-- Start Single Sidebar Widget --> */}
      <div className="sidebar-single-widget">
        <h6 className="sidebar-title">CATEGORIES</h6>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {/* <li>
                <ul className="sidebar-menu-collapse">
                
                  <li className="sidebar-menu-collapse-list">
                    <div className="accordion">
                      <a href="#" className="accordion-title collapsed"
                        data-bs-toggle="collapse" data-bs-target="#men-fashion"
                        aria-expanded="false">Men <i
                          className="ion-ios-arrow-right"></i></a>
                      <div id="men-fashion" className="collapse">
                        <ul className="accordion-category-list">
                          <li><a href="#">Dresses</a></li>
                          <li><a href="#">Jackets &amp; Coats</a></li>
                          <li><a href="#">Sweaters</a></li>
                          <li><a href="#">Jeans</a></li>
                          <li><a href="#">Blouses &amp; Shirts</a></li>
                        </ul>
                      </div>
                    </div>
                  </li>
        
                </ul>
              </li> */}
            {categories?.data?.items?.map(item => <li className="category-item" key={item.id}><span>{item.name}</span></li>)}
            {/* <li><a href="#">Football</a></li>
              <li><a href="#">Football</a></li>
              <li><a href="#"> Men's</a></li>
              <li><a href="#"> Portable Audio</a></li>
              <li><a href="#"> Smart Watches</a></li>
              <li><a href="#">Tennis</a></li>
              <li><a href="#"> Uncategorized</a></li>
              <li><a href="#"> Video Games</a></li>
              <li><a href="#">Women's</a></li> */}
          </ul>
        </div>
      </div>
      {/* <!-- End Single Sidebar Widget --> */}

      {/* <!-- Start Single Sidebar Widget --> */}
      <div className="sidebar-single-widget">
        <h6 className="sidebar-title">FILTER BY PRICE</h6>
        <div className="sidebar-content">
          <div id="slider-range"></div>
          <div className="filter-type-price">
            <label for="amount">Price range:</label>
            <input type="text" id="amount" />
          </div>
        </div>
      </div>
      {/* <!-- End Single Sidebar Widget --> */}

      {/* <!-- Start Single Sidebar Widget --> */}
      <div className="sidebar-single-widget">
        <h6 className="sidebar-title">MANUFACTURER</h6>
        <div className="sidebar-content">
          <div className="filter-type-select">
            <ul>
              <li>
                <label className="checkbox-default" for="brakeParts">
                  <input type="checkbox" id="brakeParts" />
                  <span>Brake Parts(6)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="accessories">
                  <input type="checkbox" id="accessories" />
                  <span>Accessories (10)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="EngineParts">
                  <input type="checkbox" id="EngineParts" />
                  <span>Engine Parts (4)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="hermes">
                  <input type="checkbox" id="hermes" />
                  <span>hermes (10)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="tommyHilfiger">
                  <input type="checkbox" id="tommyHilfiger" />
                  <span>Tommy Hilfiger(7)</span>
                </label>
              </li>
            </ul>
          </div>
        </div></div>
      {/*  <!-- End Single Sidebar Widget --> */}

      {/* <!-- Start Single Sidebar Widget --> */}
      {/* <div className="sidebar-single-widget">
        <h6 className="sidebar-title">SELECT BY COLOR</h6>
        <div className="sidebar-content">
          <div className="filter-type-select">
            <ul>
              <li>
                <label className="checkbox-default" for="black">
                  <input type="checkbox" id="black" />
                  <span>Black (6)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="blue">
                  <input type="checkbox" id="blue" />
                  <span>Blue (8)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="brown">
                  <input type="checkbox" id="brown" />
                  <span>Brown (10)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="Green">
                  <input type="checkbox" id="Green" />
                  <span>Green (6)</span>
                </label>
              </li>
              <li>
                <label className="checkbox-default" for="pink">
                  <input type="checkbox" id="pink" />
                  <span>Pink (4)</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
       */}
      {/* <!-- End Single Sidebar Widget --> */}

      {/* <!-- Start Single Sidebar Widget --> */}
      <div className="sidebar-single-widget">
        <h6 className="sidebar-title">Tag products</h6>
        <div className="sidebar-content">
          <div className="tag-link">
            <a href="#">asian</a>
            <a href="#">brown</a>
            <a href="#">euro</a>
            <a href="#">fashion</a>
            <a href="#">hat</a>
            <a href="#">t-shirt</a>
            <a href="#">teen</a>
            <a href="#">travel</a>
            <a href="#">white</a>
          </div>
        </div>
        {/* </div> <!-- End Single Sidebar Widget --> */}

        {/* <!-- Start Single Sidebar Widget --> */}
        <div className="sidebar-single-widget">
          <div className="sidebar-content">
            <a href="product-details-default.html" className="sidebar-banner img-hover-zoom">
              <img className="img-fluid" src="assets/images/banner/side-banner.jpg" alt="" />
            </a>
          </div>
          {/*  <!-- End Single Sidebar Widget --> */}
        </div>
      </div>
      {/* <!-- End Sidebar Area --> */}
    </div>

  )
}

export default SideBarProducts
