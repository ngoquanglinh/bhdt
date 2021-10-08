import React from 'react'
import { Message } from './ErrMessage.styled'
import PropsTypes from 'prop-types'
export default function ErrMessage({ errors, name }) {
  const error = errors[name]
  return <Message>{error && error.message}</Message>
}
ErrMessage.propTypes = {
  errors: PropsTypes.object,
  name: PropsTypes.string
}
