import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';

export default class NotFound extends React.Component {

  render() {
    return (
      <DocumentTitle title="Page not found">
        <div>
          <h1>Page not found</h1>
          <p>The route or the page handler/component for this page is missing</p>
          <Link to="home">Get the hell back!</Link>
        </div>
      </DocumentTitle>
    );
  }

}
