import React from 'react';
import {Link, RouteHandler} from 'react-router';
import Header from '../components/header';
import Footer from '../components/footer';

export default class App extends React.Component {

  componentDidMount() {
    require('fastclick').attach(document.body);
  }

  render() {
    return (
      <div>
        <Header />

        <main className="">
          <RouteHandler />
        </main>
      </div>
    );
  }

}
