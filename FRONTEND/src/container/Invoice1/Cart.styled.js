import { Link } from 'react-router-dom'
import { Button } from './../../assets/css/until'
import styled from 'styled-components'

export const ProductHeader = styled.div`
  margin-top:10px;
  align-items: center;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 /5%);
  overflow: hidden;
  border-radius: 3px;
  height: 5.5rem;
  font-size: 1.4rem;
  background: #fff;
  text-transform: capitalize;
  margin-bottom: 12px;
  color: #888;
  padding: 3px 20px;
`
export const ProductHeader1 = styled.div`
  display:flex;
  justify-content: space-between;
  margin-top:10px;
  align-items: center;
  overflow: hidden;
  height: 5.5rem;
  font-size: 1.4rem;
  background: #fff;
  text-transform: capitalize;
  margin-bottom: 12px;
  color: #888;
  padding: 3px 20px;
`

export const ProductFooter = styled.div`
  display:flex;
  justify-content: space-between;
  margin-top:10px;
  align-items: center;
  overflow: hidden;
  height: 3.5rem;
  font-size: 1.4rem;
  background: #fff;
  text-transform: capitalize;
  margin-bottom: 12px;
  color: #888;
  padding: 3px 10px;
`

export const ProductFooterTitle = styled.div`
  color: #ee4d2d;
  width: 45%;
`

export const ProductHeaderCheckbox = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 0 20px;
  min-width: 58px;
`
export const ProductHeaderTitle = styled.div`
  color: #ee4d2d;
  width: 45%;
`
export const ProductHeaderUntitPrice = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ProductHeaderQuantity = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ProductHeaderTotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ProductHeaderTotalPrice1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ee4d2d;
`

export const ProductFooterTotalPrice = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ee4d2d;
  font-size: 24px;
  line-height: 30px;
  white-space: nowrap;
`
export const PriceButton = styled(Button)`
  margin-right: 2rem;
  width: 100%;
`

export const ProductFooterDate = styled.div`
  line-height: 30px;
  color:#888888
`

export const ProductHeaderAction = styled.div`
  width: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ProductSection = styled.div`
  padding: 10px 20px;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 5%);
  border-radius: 3px;
  background: #fff;
  margin-bottom: 2.5rem;
`
export const CartItem = styled.div`
  justify-content: space-between;
  margin-bottom: 2.2rem;
  padding: 2rem 0;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-left:none;
  border-right:none;
`
export const CartItemCheckbox = styled(ProductHeaderCheckbox)``
export const CartItemOverview = styled(ProductHeaderTitle)`
  display: flex;
`
export const CartItemOverviewImage = styled(Link)`
  border-radius: 0.5rem;
  margin-left:5px;
  width: 6rem;
  height: 6rem;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`
export const CartItemOverviewNameWraper = styled.div`
  overflow: hidden;
  flex-grow: 1;
  padding: 0.5rem 2rem 0 1rem;
  display: flex;
  flex-direction: column;
`
export const CartItemOverviewName = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 0.3125rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: --webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
export const CartItemUnitPrice = styled(ProductHeaderUntitPrice)`
  span:first-child {
    color: rgba(0, 0, 0, 0.54);
    text-decoration: line-through;
    margin-right: 1rem;
  }
`
export const CartitemQuantity = styled(ProductHeaderQuantity)``
export const CartitemTotalPrice = styled(ProductHeaderTotalPrice)`
  span {
    margin-left: 5px;
    text-align: right;
    color: #ee4d2d;
  }
`
export const CartitemAction = styled(ProductHeaderAction)``
export const CartitemActionButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  transition: color 0.1s ease;
  :hover {
    color: #ee4d2d;
  }
`
export const CartFooter = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 3px;
  font-size: 1.5rem;
  position: sticky;
  bottom: 0;
  z-index: 2;
  :before {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.06));
    content: '';
    position: absolute;
    top: -1rem;
    left: 0;
    height: 1rem;
    width: 100%;
  }
`
export const CartFooterCheckbox = styled(ProductHeaderCheckbox)``
export const CartFooterButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  margin: 0 1rem;
`
export const CartFooterSpaceBetween = styled.div`
  flex-grow: 1;
`
export const CartFooterPrice = styled.div`
  margin-left: auto;
`
export const CartFooterPriceTop = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  div {
    :first-child {
      color: #222;
    }
    :last-child {
      font-size: 2.3rem;
      margin-left: 5px;
      color: #ee4d2d;
    }
  }
`
export const CartFooterPriceBot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    :first-child {
      font-size: 1.4rem;
    }
    :last-child {
      padding-left: 2.4rem;
      color: #ee4d2d;
    }
  }
`
export const CartFooterCheckout = styled(Button)`
  text-transform: capitalize;
  height: 4rem;
  font-size: 1.5rem;
  width: 21rem;
  font-weight: 300;
  margin: 0 2rem;
`
