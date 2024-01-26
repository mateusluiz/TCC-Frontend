import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/PagLogin/Login'
import Register from './pages/PagRegDev/Register'
import Update from './pages/PagUpdate/Update'
import ListDevs from './pages/PagListDevs/ListDevs'
import PagMap from './pages/PagMap/PagMap'

const Routes = () => {

  const [isAuthenticated] = useState(
    localStorage.getItem('accessToken') !== null
  );
  
  const checkAuthentication = () => {
    return isAuthenticated;
  };
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute exact path="/cadastrar-dev" component={Register} isAuthenticated={checkAuthentication()}/>
        <ProtectedRoute exact path="/atualizar/:id" component={Update} isAuthenticated={checkAuthentication()}/>
        <ProtectedRoute exact path="/lista-devs" component={ListDevs} isAuthenticated={checkAuthentication()}/>
        <ProtectedRoute exact path="/mapa" component={PagMap} isAuthenticated={checkAuthentication()}/>
      </Switch>
    </Router>
  );
}

export default Routes;