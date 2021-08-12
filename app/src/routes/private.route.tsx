import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute({ ...rest }: RouteProps) {
  const { isLoadingAuth, user } = useAuth()

  if (isLoadingAuth) {
    return <h1>loading</h1>
  }
  return user ? <Route {...rest} /> : <Redirect to="/auth" />
}
