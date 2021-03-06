import { createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import { UserProps } from '../interfaces'

import api from '../services/api.service'

type AuthContextProviderProps = {
  children: React.ReactNode
}

interface AuthContextProps {
  user: UserProps | undefined
  isLoadingAuth: boolean
  logIn: (token: string, user: UserProps) => void
  logOff: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserProps>()
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  useEffect(() => {
    verify()

    async function verify() {
      const token = Cookies.get('token')

      if (!token) return setIsLoadingAuth(false)

      try {
        const response = await api.get('/session', {
          headers: { authorization: token },
        })

        const { id, name, displayName, icon, riot } = response.data

        setUser({ id, name, icon, displayName, riot })
      } catch (error) {
        console.error(error.response.data)

        Cookies.remove('token')
      }

      setIsLoadingAuth(false)
    }
  }, [])

  function logOff() {
    Cookies.remove('token')
    setUser(undefined)
  }

  function logIn(token: string, user: UserProps) {
    Cookies.set('token', token, { expires: 1 })
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, logIn, logOff, isLoadingAuth }}>
      {props.children}
    </AuthContext.Provider>
  )
}
