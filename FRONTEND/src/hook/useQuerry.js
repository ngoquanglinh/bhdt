import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import qr from 'query-string'

export default function useQuerry() {
  const location = useLocation()
  const queryString = useMemo(() => qr.parse(location.search), [location.search])
  return queryString
}
