import { Button } from './../../assets/css/until'
import styled from 'styled-components'
import { RatingStartPercent } from '../../components/ProductRating/ProductsRating.styled'
import { RatingStartWrapper } from '../../components/ProductRating/ProductsRating.styled'
export const ProductBried = styled.div`
  display: flex;
  background: #fff;
`
export const ProductImg = styled.div`
  width: 480px;
  padding: 1.5rem;
`
export const ProductImgActive = styled.div`
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`
export const ProductImgSlider = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`
const ProductIconButton = styled.button`
  position: absolute;
  width: 2rem;
  height: 4rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
  svg {
    width: 2rem;
    height: 2rem;
    fill: currentColor;
  }
`
export const ProductIconButtonPrev = styled(ProductIconButton)`
  left: 0;
`
export const ProductImgs = styled.div`
  padding: 0.5rem;
  height: 92px;
  width: 92px;
  flex-shrink: 0;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    max-width: 100%;
    max-height: 100%;
    border: 2px solid ${({ active }) => (active ? '#ee4d2d' : 'transparent')};
  }
`
export const ProductIconButtonNext = styled(ProductIconButton)`
  right: 0;
`
export const ProductMeta = styled.div`
  flex: 1;
  padding: 1.5rem;
`
export const ProductTitle = styled.h1`
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`
export const ProductMeta1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`
export const ProductMeta1Item = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-right: 1px solid rgba(0, 0, 0, 0.14);
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
    border-right: 0;
  }
`
export const ProductRating = styled(ProductMeta1Item)`
  span {
    color: #ee4d2d;
    border-bottom: 1px solid #ee4d2d;
    font-size: 1.6rem;
    margin-right: 0.6rem;
  }
  ${RatingStartWrapper} svg {
    width: 1.4rem;
    height: 1.4rem;
  }
  ${RatingStartPercent} svg {
    color: #ee4d2d;
    fill: #ee4d2d;
  }
`
export const ProductSold = styled(ProductMeta1Item)`
  span:first-child {
    font-size: 1.5rem;
    color: #222;
    margin-right: 5px;
    padding-bottom: 1px;
  }
  span:last-child {
    font-size: 1.4rem;
    color: #767676;
    text-transform: capitalize;
  }
`
export const ProductPrice = styled.div`
  padding: 2rem;
  background: #fafafa;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
`
export const ProductPriceOrginal = styled.div`
  font-size: 1.5rem;
  text-decoration: line-through;
  color: #929292;
  margin-right: 10px;
`
export const ProducePriceSales = styled.div`
  font-size: 3rem;
  font-weight: 500;
  color: #ee4d2d;
`
export const ProductPriceSalesPercent = styled.div`
  font-size: 1.2rem;
  color: #fff;
  text-transform: uppercase;
  background-color: #ee4d2d;
  border-radius: 2px;
  padding: 2px 4px;
  font-weight: 600;
  line-height: 1;
  margin-left: 14px;
  white-space: nowrap;
`
export const ProductByQuantity = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`
export const ProductByQuantityTitle = styled.div`
  color: #757575;
  text-transform: capitalize;
  flex: 0 0 110px;
  max-width: 110px;
`
export const ProductByQuantityControler = styled.div`
  margin-right: 1.2rem;
`
export const ProductQuantityCount = styled.div``
export const ProductButton = styled(Button)`
  background: rgba(255, 87, 32, 0.1);
  border: 1px solid #ee4d2d;
  box-shadow: 0 1px 1px 0 rgba(0 0 0 /3%);
  color: #ee4d2d;
  margin-right: 15px;
  padding: 0 1.2rem;
  font-size: 14px;
  height: 45px;
  svg {
    margin-right: 10px;
    color: #ee4d2d;
    stroke: #ee4d2d;
    width: 2rem;
    height: 2rem;
  }
  &:hover {
    background: rgba(255, 87, 34, 0.15);
  }
`
export const ProductContent = styled.div`
  box-shadow: 0 1px 1px 0 rgba(0 0 0 /5%);
  border-radius: 0.2rem;
  overflow: hidden;
  background: #fff;
  margin-top: 3rem;
  padding: 2rem;
`
export const ProductContentHeading = styled.div`
  background-color: rgba(0, 0, 0, 0.02);
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.5rem;
  padding: 1.4rem;
  text-transform: capitalize;
`
export const ProductContentDetail = styled.div`
  margin: 3rem 1.5rem 1.5rem;
  font-size: 1.5rem;
  line-height: 2.2;
`
