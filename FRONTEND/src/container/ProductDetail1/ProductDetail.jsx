import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductQuantity from './../../components/ProductQuantity/ProductQuantity'
import ProductRating from './../../components/ProductRating/ProductRating'
import { formatK, formatMoney, getIdToNameId, rateSales } from './../../utils/helper'
import * as sly from './ProductDetial.styled'
import DOMPurify from 'dompurify'
import { getProductDetail, addCart } from './../../state/actions';
import { toast } from 'react-toastify';
import { startActionWithPromise } from './../../Helper//saga-promise-helpers';
import Comment from "./Comment";

export default function ProductDetail() {
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [indexImg, setIndexImg] = useState(0)
  const account = useSelector(state => state.login.user);
  const dispatch = useDispatch()
  const { idProduct } = useParams()


  useEffect(async () => {
    const realId = getIdToNameId(idProduct)
    try {
      const res = await startActionWithPromise(getProductDetail, { id: realId }, dispatch);
      if (res.success) {
        res.data.images = res.data.images.map((image, index) => {
          return {
            url: image.url,
            id: index
          }
        })
        setProduct(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [idProduct, dispatch])

  const chooseCurrent = v => setIndexImg(v);

  const choosePrev = (v) => {
    setIndexImg(v)
  }
  const chooseNext = (v) => {
    setIndexImg(v)
  }
  const handleAddToCart = async () => {
    let item = {
      ...product,
      colorSelect: { id: "", name: "" },
      sizeSelect: { id: "", name: "" }
    }
    dispatch(addCart({ item, quantity: quantity }));
    toast.success("Thêm vào giỏ hàng thành công");

  }

  const changeQuantity = (action, value) => {
    const quantityProduct = product.inventories.reduce(
      (p, c) => p + c.inventory, 0
    );
    if (action == "add") {
      setQuantity(parseInt(quantity + value));
    } else {
      if (parseInt(quantity - value) == 0) {
        setQuantity(1);
      } else {
        setQuantity(parseInt(quantity - value));
      }
    }
  }


  const allImages = product ? product.images : [];
  const nextImage = allImages.length < 2 ? 0 : (indexImg + 1) % allImages.length;
  const prevImage = allImages.length < 2 ? 0 : (indexImg + allImages.length - 1) % allImages.length;
  return (
    <div>
      {product && (
        <div className="container">
          <sly.ProductBried>
            <sly.ProductImg>
              <sly.ProductImgActive>
                <img src={product.images[indexImg].url} alt="" />
              </sly.ProductImgActive>
              <sly.ProductImgSlider>
                <sly.ProductIconButtonPrev onClick={() => choosePrev(prevImage)}>
                  <svg
                    enableBackground="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-left"
                  >
                    <g>
                      <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z" />
                    </g>
                  </svg>
                </sly.ProductIconButtonPrev>
                {product.images.map((img, index) => (
                  <sly.ProductImgs
                    key={img.id}
                    onMouseEnter={() => chooseCurrent(index)}
                    active={indexImg == index}
                  >
                    <img src={img.url} alt="" />
                  </sly.ProductImgs>
                ))}
                <sly.ProductIconButtonNext onClick={() => chooseNext(nextImage)}>
                  <svg
                    enableBackground="new 0 0 11 11"
                    viewBox="0 0 11 11"
                    x={0}
                    y={0}
                    className="shopee-svg-icon icon-arrow-right"
                  >
                    <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z" />
                  </svg>
                </sly.ProductIconButtonNext>
              </sly.ProductImgSlider>
            </sly.ProductImg>
            <sly.ProductMeta>
              <sly.ProductTitle>{product.name}</sly.ProductTitle>
              <sly.ProductMeta1>
                <sly.ProductRating>
                  <span>{product.rating}</span>
                  <ProductRating rating={product.rating}></ProductRating>
                </sly.ProductRating>
                <sly.ProductSold>
                  <span>{formatK(product.sale)}</span>
                  <span>Đã bán</span>
                </sly.ProductSold>
              </sly.ProductMeta1>
              <sly.ProductPrice>
                {
                  product.discount > 0 ?
                    <Fragment>
                      <sly.ProductPriceOrginal>đ{formatMoney(product.price)}</sly.ProductPriceOrginal>
                      <sly.ProducePriceSales>đ{formatMoney(product.price - (product.price * product.discount / 100))}</sly.ProducePriceSales>
                      <sly.ProductPriceSalesPercent>
                        {product.discount} Giảm giá
                      </sly.ProductPriceSalesPercent>
                    </Fragment>
                    :
                    <Fragment>
                      <sly.ProducePriceSales>đ{formatMoney(product.price)}</sly.ProducePriceSales>
                    </Fragment>
                }

              </sly.ProductPrice>
              <sly.ProductByQuantity>
                <sly.ProductByQuantityTitle>Số lượng</sly.ProductByQuantityTitle>
                <sly.ProductByQuantityControler>
                  <ProductQuantity
                    value={quantity}
                    max={product.inventories.reduce(
                      (p, c) => p + c.inventory, 0
                    )}
                    onIncrease={() => changeQuantity("add", 1)}
                    onDecrease={() => changeQuantity("minus", 1)}
                  ></ProductQuantity>
                </sly.ProductByQuantityControler>
                <sly.ProductQuantityCount>
                  {product.inventories.reduce(
                    (p, c) => p + c.inventory, 0
                  ) + " "}
                  Sản phẩm có sẵn</sly.ProductQuantityCount>
              </sly.ProductByQuantity>
              <sly.ProductButton onClick={handleAddToCart}>
                <svg
                  enableBackground="new 0 0 15 15"
                  viewBox="0 0 15 15"
                  x={0}
                  y={0}
                  className="shopee-svg-icon _2FCuXA icon-add-to-cart"
                >
                  <g>
                    <g>
                      <polyline
                        fill="none"
                        points=".5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                      />
                      <circle cx={6} cy="13.5" r={1} stroke="none" />
                      <circle cx="11.5" cy="13.5" r={1} stroke="none" />
                    </g>
                    <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1="7.5" x2="10.5" y1={7} y2={7} />
                    <line fill="none" strokeLinecap="round" strokeMiterlimit={10} x1={9} x2={9} y1="8.5" y2="5.5" />
                  </g>
                </svg>
                Thêm vào giỏ hàng
              </sly.ProductButton>
            </sly.ProductMeta>
          </sly.ProductBried>
          <sly.ProductContent>
            <sly.ProductContentHeading>Mô tả sản phẩm</sly.ProductContentHeading>
            <sly.ProductContentDetail
              dangerouslySetInnerHTML={
                // Sử dụng DOMPurify.sanitize( dirty ); để render ra html tránh các đoạn mã script
                { __html: DOMPurify.sanitize(product.description) }
              }
            ></sly.ProductContentDetail>
          </sly.ProductContent>
          {
            <sly.ProductContent>
              <sly.ProductContentHeading>Bình Luận</sly.ProductContentHeading>
              <sly.ProductContentDetail>
                <Comment idProduct={getIdToNameId(idProduct)} user={account} />
              </sly.ProductContentDetail>
            </sly.ProductContent>
          }
        </div>
      )}
    </div >
  )
}
