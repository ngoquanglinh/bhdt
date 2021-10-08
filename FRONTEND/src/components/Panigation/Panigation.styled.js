import styled from 'styled-components'
const ButtonPanigation = styled.button`
  color: rgba(0, 0, 0, 0.4);
  min-width: 3rem;
  height: 3rem;
  margin: 0 1.5rem;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  border-radius: 2px;
`
export const panigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem auto 4rem;
`
export const ButtonIcon = styled(ButtonPanigation)`
  svg {
    width: 1.3rem;
    height: 1.3rem;
    fill: currentColor;
  }
`

export const ButtonNoOutLine = styled(ButtonPanigation)`
  &.active {
    color: #fff;
    background: #ee4d2d;
    transition: background 0.2 ease;
    &:hover {
      background: #f05d40;
    }
  }
`
