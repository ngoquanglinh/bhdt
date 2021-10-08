import React, { Fragment } from 'react'
import * as sly from './Popup.styled'
import PropTypes from 'prop-types'
export default function Popup({ active, children }) {
  return (
    <div>
      {active && (
        <sly.drawer>
          <sly.popuparow></sly.popuparow>
          <sly.popupContent>{children}</sly.popupContent>
        </sly.drawer>
      )}
    </div>
  )
}

Popup.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
}
