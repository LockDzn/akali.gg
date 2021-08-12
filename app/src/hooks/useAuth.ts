import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'

export function useAuth() {
  const value = useContext(AuthContext)
  return value
}
