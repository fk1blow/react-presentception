import React from 'react'
import Reflux from 'reflux'
import {Link, RouteHandler} from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import ApplicationStore from '../stores/application/store'
import ApplicationActions from '../stores/application/actions'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = ApplicationStore.getInitialState()
  }

  componentDidMount() {
    require('fastclick').attach(document.body)
    ApplicationActions.bootstrap()
    ApplicationStore.listen((updates) => this.setState(updates))
  }

  shouldComponentUpdate(oldState, newState) {
    return oldState !== newState
  }

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

}
