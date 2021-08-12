import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { PrivateRoute } from './private.route'

import { Index } from '../pages/Index'
import { CreateAccount } from '../pages/CreateAccount'
import { Auth } from '../pages/Auth'

import { Home } from '../pages/Authorized/Home'
import { CreateMatch } from '../pages/Authorized/CreateMatch'
import { User } from '../pages/Authorized/User'

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/create-account" exact component={CreateAccount} />

        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/create-match/:id" exact component={CreateMatch} />
        <PrivateRoute path="/user/:name/:tab?" component={User} />
      </Switch>
    </BrowserRouter>
  )
}
