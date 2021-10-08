import { Link } from 'react-router-dom'
import { Button, ButtonLink } from './../../../../../assets/css/until'
import styled from 'styled-components'

export const Header = styled.header`
  background-color: #ee4d2d;
`
export const Searchwraper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`

export const logo = styled(Link)`
  margin-right: 4rem;
  svg {
    width: 162px;
    height: 50px;
    fill: #fff;
  }
`

export const styledForm = styled.form`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 4px;
  background: #fff;
  border-radius: 2px;
  height: 4rem;
`
export const StyledInput = styled.input`
  flex-grow: 1;
  border: 0;
  padding-left: 1rem;
`
export const styledButton = styled(Button)`
  padding: 0 20px;
  height: auto;
  svg {
    color: #fff;
    fill: currentColor;
  }
`

export const cart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 5rem;
`
export const cartContainer = styled.div`
  position: relative;
`
export const cartIcon = styled.div`
  padding: 10px;
  display: inline-block;
  position: relative;
  svg {
    color: #fff;
    stroke: #fff;
    fill: currentColor;
    width: 26px;
    height: 26px;
  }
`
export const cartNumber = styled.div`
  position: absolute;
  border-radius: 4rem;
  min-width: 11px;
  padding: 0 5px;
  text-align: center;
  border: 2px solid #ee4d2d;
  color: #ee4d2d;
  background-color: #fff;
  line-height: 1;
  top: 2px;
  right: 2px;
`
export const PopupContent = styled.div`
  box-shadow: 0 1px 3.125rem 0 rgb(0 0 0 / 20%);
  border-radius: 0.125rem;
  overflow: hidden;
  background-color: #fff;
  width: 40rem;
`
export const PropupTitile = styled.div`
  padding: 1.5rem 0 2rem 1rem;
  color: rgba(0, 0, 0, 0.26);
  text-transform: capitalize;
`
export const miniProductCart = styled.div`
  display: flex;
  padding: 1rem;
`
export const miniProductCartImg = styled.img`
  border-radius: 0.5rem;
  flex-shrink: 1;
  width: 4rem;
  height: 4rem;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 0.5rem;
  overflow: hidden;
`
export const miniPropductCartTitle = styled.div`
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-left: 1rem;
`
export const miniProductCartPrice = styled.div`
  margin-left: 4rem;
  flex-shrink: 1;
  color: #ee4d2d;
`
export const PropupFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`
export const moreProduct = styled.div`
  flex-grow: 1;
  text-transform: capitalize;
`
export const buttonShowCart = styled(ButtonLink)`
  height: 3.5rem;
  padding: 1px 15px;
  text-transform: capitalize;
  flex-shrink: 0;
`
