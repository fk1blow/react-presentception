import Reflux from 'reflux';
import ApplicationActions from '../actions/application-actions'
import Telekomand from '../../lib/telekomand/telekomand';

export default Reflux.createStore({

  init() {
    this.telekomand = {id: undefined, state: undefined}
    this.listenToMany(ApplicationActions)
    Telekomand.on('telekomand.ready', (id) => this.handleTelekomandReady(id))
  },

  getInitialState() {
    return {telekomand: this.telekomand}
  },

  onBootstrap() {
    this.telekomand = Telekomand.info()
    this.trigger({telekomand: this.telekomand})
  },

  handleTelekomandReady(id) {
    this.telekomand.id = id
    this.trigger({telekomand: this.telekomand})
  }

})
