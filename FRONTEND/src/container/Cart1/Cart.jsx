import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from './../../components/BaseCheckBox/CheckBox'
import ProductQuantity from './../../components/ProductQuantity/ProductQuantity'
import { formatMoney } from './../../utils/helper'
import * as sly from './Cart.styled'
import { removeCart, removeOneItemCart, addOneItemCart, changeStatusCheckout } from './../../state/actions';
import { useHistory } from "react-router-dom";
import { path } from './../../constant/path';

export default function Cart() {
  const dispatch = useDispatch()
  const [ids, setIds] = useState([]);
  const products = useSelector(state => state.cart.items)
  const history = useHistory();

  const handleInputQuantity = indexPurchare => value => {
  }
  const handleBlurQuantity = indexPurchare => async value => {
  }

  const handleCheck = id => {
    const index = ids.findIndex(x => id == x);
    if (index >= 0) {
      setIds(ids.filter(item => item != id));
    } else {
      setIds([...ids, id]);
    }
  }
  const handleCheckAll = () => {
    setIds(products.map(item => item.product.id));
    if (ids.length == products.length) {
      setIds([]);
    } else {
      setIds(products.map(item => item.product.id));
    }
  }
  const totalPrice = () => {
    if (ids.length > 0) {
      const items = products.filter(x => ids.includes(x.product.id));
      if (items.length == 0) return 0;
      return (
        items.reduce((a, c) => {
          if (c.product.discount) {
            return [...a, (c.quantity * (c.product.price - (c.product.price * c.product.discount / 100)))]
          } else {
            return [...a, (c.quantity * c.product.price)]
          }
        }, []).reduce((a, c) => parseInt(a + c))
      )
    } else {
      return 0;
    }
  }

  const checkout = () => {
    if (ids.length > 0) {
      dispatch(changeStatusCheckout(ids));
      history.push(path.checkout);
    }
  }

  return (
    <div className="container">
      <div>
        <sly.ProductHeader>
          <sly.ProductHeaderCheckbox>
            <CheckBox onChange={handleCheckAll}
              checked={products.length == ids.length} />
          </sly.ProductHeaderCheckbox>
          <sly.ProductHeaderTitle>S???n ph???m</sly.ProductHeaderTitle>
          <sly.ProductHeaderUntitPrice>????n gi??</sly.ProductHeaderUntitPrice>
          <sly.ProductHeaderQuantity>S??? l?????ng</sly.ProductHeaderQuantity>
          <sly.ProductHeaderTotalPrice>S??? ti??n</sly.ProductHeaderTotalPrice>
          <sly.ProductHeaderAction>Thao t??c</sly.ProductHeaderAction>
        </sly.ProductHeader>
        <sly.ProductSection>
          {products.map((item, index) => (
            <sly.CartItem key={index}>
              <sly.CartItemCheckbox>
                <CheckBox checked={ids.includes(item.product.id)}
                  onChange={() => handleCheck(item.product.id)} />
              </sly.CartItemCheckbox>
              <sly.CartItemOverview>
                <sly.CartItemOverviewImage to="">
                  <img src={item.product.images[0].url} alt="" />
                </sly.CartItemOverviewImage>
                <sly.CartItemOverviewNameWraper>
                  <sly.CartItemOverviewName>{item.product.name}</sly.CartItemOverviewName>
                </sly.CartItemOverviewNameWraper>
              </sly.CartItemOverview>
              <sly.CartItemUnitPrice>
                {
                  item.product.discount > 0 ?
                    <Fragment>
                      <span>??{formatMoney(item.product.price - (item.product.price * item.product.discount / 100))}</span>
                      <span>??{formatMoney(item.product.price)}</span>
                    </Fragment>
                    :
                    <Fragment>
                      ??{formatMoney(item.product.price)}
                    </Fragment>
                }

              </sly.CartItemUnitPrice>
              <sly.CartitemQuantity>
                <ProductQuantity
                  max={item.product.inventories.reduce(
                    (p, c) => p + c.inventory, 0
                  )}
                  value={item.quantity}
                  disabled={item.disabled}
                  onInput={() => handleInputQuantity(index)}
                  onBlur={() => handleBlurQuantity(index)}
                  onIncrease={() => dispatch(addOneItemCart(item))}
                  onDecrease={() => dispatch(removeOneItemCart(item))}
                />
              </sly.CartitemQuantity>
              <sly.CartitemTotalPrice>
                <span>???{formatMoney((item.quantity * (item.product.price - (item.product.price * item.product.discount / 100))))}</span>
              </sly.CartitemTotalPrice>
              <sly.CartitemAction>
                <sly.CartitemActionButton onClick={() => dispatch(removeCart(item))}>X??a</sly.CartitemActionButton>
              </sly.CartitemAction>
            </sly.CartItem>
          ))}
        </sly.ProductSection>
      </div>
      <sly.CartFooter>
        <sly.CartFooterCheckbox>
          <CheckBox onChange={handleCheckAll} checked={products.length == ids.length} />
        </sly.CartFooterCheckbox>
        <sly.CartFooterButton onClick={handleCheckAll}>Ch???n t???t c??? ({products.length})</sly.CartFooterButton>
        <sly.CartFooterButton onClick={() => setIds([])}>X??a</sly.CartFooterButton>
        <sly.CartFooterSpaceBetween />
        <sly.CartFooterPrice>
          <sly.CartFooterPriceTop>
            <div>T???ng thanh to??n ({ids.length} s???n ph???m)</div>
            <div>???{formatMoney(totalPrice())}</div>
          </sly.CartFooterPriceTop>
          <sly.CartFooterPriceBot>
            <div>Ti???t ki???m</div>
            <div>???{formatMoney(0)}</div>
          </sly.CartFooterPriceBot>
        </sly.CartFooterPrice>
        <sly.CartFooterCheckout onClick={checkout}>Mua h??ng</sly.CartFooterCheckout>
      </sly.CartFooter>
    </div>
  )
}
