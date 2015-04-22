import Reflux from 'reflux';
import ApplicationActions from './actions'
import Telekomand from '../../../lib/telekomand/telekomand';

export default Reflux.createStore({

  init() {
    this.telekomand = {id: undefined, state: undefined}
    this.listenToMany(ApplicationActions)
  },

  getInitialState() {
    return {telekomand: this.telekomand}
  },

  onBootstrap() {
    Telekomand.on('telekomand.ready', (id) => this.handleTelekomandReady(id))
  },

  handleTelekomandReady(id) {
    this.telekomand.id = id
    this.trigger({telekomand: this.telekomand})
  }

})
