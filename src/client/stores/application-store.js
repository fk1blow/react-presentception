import Reflux from 'reflux';
import ApplicationActions from '../actions/application-actions'
import Telekomand from '../../lib/telekomand/telekomand';

export default Reflux.createStore({

  init() {
    this.telekomand = {id: undefined, state: undefined}
    this.listenToMany(ApplicationActions)
    Telekomand.on('telekomand.ready', (id) => {
      console.log('telekomand ready', id)
    })
    // Telekomand.on('become_remote', () => this.telekomandChangedState())
    // Telekomand.on('become_presenter', () => this.telekomandChangedState())
  },

  getInitialState() {
    return {telekomand: this.telekomand}
  },

  onBootstrap() {
    // this.telekomandChangedState()
  },

  telekomandChangedState() {
    this.telekomand = Telekomand.info()
    this.trigger({telekomand: this.telekomand})
  }

})
