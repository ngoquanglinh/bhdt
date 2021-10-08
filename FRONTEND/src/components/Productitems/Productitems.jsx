import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ProductRating from './../ProductRating/ProductRating';
import * as sly from './ProductItem.styled'
import PropTypes from 'prop-types'
import { path } from './../../constant/path'
import { generaNameId } from './../../utils/helper'
import { formatMoney } from './../../utils/helper'
import { formatK } from './../../utils/helper'

export default function ProductItems({ product }) {
  return (
    <sly.Product>
      <Link to={path.product + `/${generaNameId(product)}`}>
        <sly.productItems>
          <sly.productItemsImg>
            <img src={product.images[0].url} alt={product.name} />
          </sly.productItemsImg>
          <sly.productItemsInfo>
            <sly.productItemsTitle>{product.name}</sly.productItemsTitle>
            <sly.productItemsPrice>
              {
                product.discount > 0 ?
                  <Fragment>
                    <sly.productItemsPriceOriginal>
                      đ{formatMoney(product.price)}
                    </sly.productItemsPriceOriginal>
                    <sly.productItemsPriceSales>đ{formatMoney(product.price - (product.price * product.discount / 100))}</sly.productItemsPriceSales>
                  </Fragment>
                  :
                  <Fragment>
                    <sly.productItemsPriceSales>đ{formatMoney(product.price)}</sly.productItemsPriceSales>
                  </Fragment>
              }

            </sly.productItemsPrice>
            <sly.productItemsMeta>
              <ProductRating rating={5} />
              <sly.productItemsSold>
                <span>{formatK(product.sale)}</span>
                <span>Đã bán</span>
              </sly.productItemsSold>
            </sly.productItemsMeta>
          </sly.productItemsInfo>
        </sly.productItems>
      </Link>
    </sly.Product>
  )
}
ProductItems.propTypes = {
  product: PropTypes.object.isRequired
}
