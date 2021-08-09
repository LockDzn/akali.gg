import React from 'react'

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import { Index } from '../pages/Index'
import { CreateAccount } from '../pages/CreateAccount'

import { Home } from '../pages/Authorized/Home'
import { CreateMatch } from '../pages/Authorized/CreateMatch'

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/create-account" exact component={CreateAccount} />
        <Route path="/home" exact component={Home} />
        <Route path="/create-match/:id" exact component={CreateMatch} />
      </Switch>
    </BrowserRouter>
  )
}
