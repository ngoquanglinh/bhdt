import { Link } from 'react-router-dom'
import { drawer } from './../Popup1/Popup.styled'
import styled from 'styled-components'

export const Navbar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`
export const NavMenu = styled.div`
  display: flex;
  margin-bottom: 0;
`
export const navLink = styled(Link)`
  color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
  &:hover {
    color: hsla(0, 0, 100%, 0.7);
  }
`

export const userLink = styled(Link)`
  color: rgba(0, 0, 0, 0.8);
  padding: 1rem 0 1rem 1.5rem;
  display: block;
  &:hover {
    background-color: #fafafa;
    color: #00bfa5;
  }
`

export const user = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
  ${drawer} {
    width: 15rem;
    top: 135%;
  }
`
export const userImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
`
export const userName = styled.div`
  padding-left: 5px;
  max-width: 15rem;
  text-overflow: ellipsis;

  ul {
    list-style: none;
  }
`

export const userButton = styled.div`
  color: rgba(0, 0, 0, 0.8);
  padding: 1rem 0 1rem 1.5rem;
  display: block;
  background: transparent;
  border: none;
  &:hover {
    background-color: #fafafa;
    color: #00bfa5;
  }
`
