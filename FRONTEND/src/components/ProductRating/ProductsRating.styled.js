import styled from 'styled-components'

export const RatingStarts = styled.div`
  display: flex;
`
export const RatingStartWrapper = styled.div`
  position: relative;
  margin-right: 1px;
  svg {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
    position: relative;
    display: inline-block;
  }
  > svg {
    color: #d5d5d5;
    display: block;
  }
`
export const RatingStartPercent = styled.div`
  overflow: hidden;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  svg {
    color: #ffce3d;
    fill: #ffce3d;
    display: block;
    position: absolute;
    left: 0;
  }
`
