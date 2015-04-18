// import Reflux from 'reflux';
import alt from '../../lib/alt-proxy'
import ApplicationActions from '../actions/application-actions'
import Telekomand from '../../lib/telekomand/telekomand'

class ApplicationStore {

  constructor() {
    this.bindListeners({
      appInitialize: ApplicationActions.appInitialize
    })

    this.telekomand = {
      id: undefined,
      state: null
    }
  }

  appInitialize() {
    this.telekomand = Telekomand.info()
    this.setState({ telekomand: this.telekomand })
  }

}

export default alt.createStore(ApplicationStore, 'ApplicationStore')
