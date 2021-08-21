import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import { Loading } from '../components/Loading'

export function PrivateRoute({ ...rest }: RouteProps) {
  const { isLoadingAuth, user } = useAuth()

  if (isLoadingAuth) {
    return <Loading />
  }

  return user ? <Route {...rest} /> : <Redirect to="/auth" />
}
