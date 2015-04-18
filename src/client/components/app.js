import React from 'react'
import {Link, RouteHandler} from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import ApplicationStore from '../stores/application-store'
import ApplicationActions from '../actions/application-actions'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = ApplicationStore.getState()
    this.onChange = this.onChange.bind(this)
    ApplicationStore.listen(this.onChange)
  }

  componentDidMount() {
    require('fastclick').attach(document.body)
    ApplicationActions.appInitialize()
  }

  componentWillUnmount() {
    ApplicationStore.unlisten(this.onChange)
  }

  onChange(store) {
    console.log('onChange triggered')
    this.setState(ApplicationStore.getState())
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
