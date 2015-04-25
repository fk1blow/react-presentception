import Reflux from 'reflux';
import ApplicationActions from './actions'
import PresentatorActions from '../presentator/actions'
import Telekomand from '../../../lib/telekomand/telekomand';

/*
  Application store
 */
export default Reflux.createStore({

  init() {
    this.telekomand = {id: undefined, state: undefined}
    this.listenToMany(ApplicationActions)
    Telekomand.on('remote.command', this.onRemoteCommand)
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
  },

  onRemoteCommand(command) {
    PresentatorActions.onNavigateSlide(command)
  }

})
