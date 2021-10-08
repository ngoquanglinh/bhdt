import { useSelector } from 'react-redux'

export function useAuth() {
  return useSelector(state => Boolean(state.login.user))
}
