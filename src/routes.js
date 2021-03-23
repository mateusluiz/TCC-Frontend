import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home'
import Update from './Update.js'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/atualizar/:id" component={Update} />
    </Switch>
  </BrowserRouter>
)

export default Routes;