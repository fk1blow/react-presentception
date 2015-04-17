import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';

// usual routes found on a web app...
import App from './components/app';
import Home from './components/home';
import NotFound from './components/notfound';
import About from './components/about-page';
import Configuration from './components/configure-page';

// presentation page - dashboard and presentation show/details
import Presentation from './components/presentation';
import PresentationDashboard from './components/presentation/dashboard';
import PresentationDetails from './components/presentation/details';

// slide presentator wrapper - proxy of a `RouteHandler` component
import SlidePresentator from './components/presentator/slide-wrapper';

// remote peers/control endpoints
import Remote from './components/remote';
import RemoteConnect from './components/remote/connect';
import RemoteDashboard from './components/remote/dashboard';
import RemoteControl from './components/remote/control';

export default (
  <Route handler={App}>
    <DefaultRoute handler={Home} name="home" />

    <Route name="presentations" handler={Presentation}>
      <DefaultRoute name="presentations-dashboard" handler={PresentationDashboard} />

      <Route name="presentation-details" handler={PresentationDetails} path=":id">
        <Route name="slide-presentation" handler={SlidePresentator} path="slides/:index" />
      </Route>
    </Route>

    <Route name="remote" handler={Remote}>
      <DefaultRoute name="remote-dashboar" handler={RemoteDashboard} />
      <Route name="remote-connect" handler={RemoteConnect} path="connect" />
      <Route name="remote-control" handler={RemoteControl} path="control" />
    </Route>

    <Route handler={About} name="about" />
    <Route handler={Configuration} name="configuration" />

    <NotFoundRoute handler={NotFound} name="not-found" />
  </Route>
);
