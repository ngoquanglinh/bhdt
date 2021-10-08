import React from 'react'
import * as sly from './CheckBox.styled'
import PropTypes from 'prop-types'
export default function CheckBox({ onChange, checked, ...props }) {
  const handleChange = event => {
    const value = event.target.checked
    onChange && onChange(value)
  }
  return (
    <sly.Checkbox>
      <sly.CheckboxInput type="checkbox" onChange={handleChange} checked={checked} {...props} />
      <sly.CheckBox2 />
    </sly.Checkbox>
  )
}
CheckBox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool
}
