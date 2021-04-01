import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/PagHome/Home'
import Update from './pages/PagUpdate/Update'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/atualizar/:id" component={Update} />
    </Switch>
  </BrowserRouter>
)

export default Routes;