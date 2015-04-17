import React from 'react';
import {RouteHandler} from 'react-router';

class TheaterPage extends React.Component {

  render() {
    return (
      <RouteHandler />
    )
  }

}

TheaterPage.contextTypes = {
  router: React.PropTypes.func
};

export default TheaterPage;
