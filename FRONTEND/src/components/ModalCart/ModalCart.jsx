import React from 'react'
import {Link} from 'react-router-dom'

function ModalCart({itemCart}) {
  const {img,itemCount,price} = itemCart;
 
  return (
    <div className="modal fade" id="modalAddcart" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog  modal-dialog-centered modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col text-right">
                  <button type="button" className="close modal-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"> <i className="fa fa-times"></i></span>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="modal-add-cart-product-img">
                        <img className="img-fluid" src={img} alt="" />
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="modal-add-cart-info"><i className="fa fa-check-square"></i>Added to cart
                      successfully!</div>
                      <div className="modal-add-cart-product-cart-buttons">
                        <Link to="/cart">View Cart</Link>
                        <a href="checkout.html">Checkout</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5 modal-border">
                  <ul className="modal-add-cart-product-shipping-info">
                    <li> <strong><i className="icon-shopping-cart"></i> There Are {itemCount} Items In Your
                      Cart.</strong></li>
                    <li> <strong>TOTAL PRICE: </strong> <span>{price}đ</span></li>
                    <li className="modal-continue-button"><a href="#" data-bs-dismiss="modal">CONTINUE
                      SHOPPING</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalCart
