import React from 'react'
import Reflux from 'reflux'
import {Link, RouteHandler} from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import ApplicationStore from '../stores/application-store'
import ApplicationActions from '../actions/application-actions'

export default React.createClass({

  mixins: [Reflux.connect(ApplicationStore)],

  componentDidMount() {
    require('fastclick').attach(document.body)
    ApplicationActions.bootstrap()
  },

  shouldComponentUpdate(oldState, newState) {
    return oldState !== newState
  },

  render() {
    return (
      <div>
        <Header />

        <main className="">
          <RouteHandler />
        </main>

        <Footer telekomandInfo={this.state.telekomand} />
      </div>
    );
  }

})
