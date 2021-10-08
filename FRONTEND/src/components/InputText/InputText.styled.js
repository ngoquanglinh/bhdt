import styled from 'styled-components'

export const FormControl = styled.div`
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-color: ${({ focus }) => (focus ? 'rgpa(0,0,0,0.54)' : '')};
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  display: flex;
  height: 4rem;
  input {
    outline: none;
    border: 0;
    padding: 1.2rem;
    flex-grow: 1;
  }
`
