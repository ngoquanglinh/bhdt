import React, { useState } from 'react'
import * as sly from './InputText.styled'
export default function InputText({ ...props }) {
  const [focus, setFocus] = useState(false)

  return (
    <sly.FormControl focus={focus}>
      <input {...props} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </sly.FormControl>
  )
}
