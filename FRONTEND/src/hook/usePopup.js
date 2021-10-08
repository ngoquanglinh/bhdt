import React, { useState } from 'react'

export default function usePopup() {
  const [activePopup, setactivePopup] = useState(false)
  const showPopup = () => setactivePopup(true)
  const hidePopup = () => setactivePopup(false)
  return {
    activePopup,
    showPopup,
    hidePopup
  }
}
