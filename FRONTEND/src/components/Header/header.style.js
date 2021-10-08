import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Header = styled.header`
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  width: 100%;
  min-width: max-content;
`
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
`

export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
`
export const HeaderIcon = styled(Link)`
  marign-top: -0, 5rem;
  svg {
    fill: #ee4d2d;
    height: 4.2rem;
    width: auto;
  }
`
export const HeaderTitle = styled.div`
  color: height;
  font-size: 2.4rem;
  margin-left: 1.2rem;
`
