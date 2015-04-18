import Reflux from 'reflux';
import ApplicationActions from '../actions/application-actions'
import Telekomand from '../../lib/telekomand/telekomand';

export default Reflux.createStore({

  init() {
    this.telekomand = {id: undefined, state: undefined}
    this.listenToMany(ApplicationActions)
  },

  getInitialState() {
    return {telekomand: this.telekomand}
  },

  onBootstrap() {
    this.telekomand = Telekomand.info()
    this.trigger({telekomand: this.telekomand})
  }

})
