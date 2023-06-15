import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/PagHome/Home'
import Update from './pages/PagUpdate/Update'
import ListDevs from './pages/PagListDevs/ListDevs'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/atualizar/:id" component={Update} />
      <Route exact path="/lista-devs" component={ListDevs} />
    </Switch>
  </BrowserRouter>
)

export default Routes;