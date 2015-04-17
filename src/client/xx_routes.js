import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

import App from './components/app';
import Home from './components/home-page';

import NotFound from './components/notfound';

const Routes = (
  <Route handler={App}>

    <DefaultRoute handler={Home} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />

  </Route>
);

export default Routes;
