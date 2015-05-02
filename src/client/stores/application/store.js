import Reflux from 'reflux'
import ApplicationActions from './actions'
import PresentatorActions from '../presentator/actions'
import Telekomand from '../../../lib/telekomand/telekomand-facade'
import ConnectorsList from '../../../lib/telekomand/connectors'

/*
  Application store
 */
export default Reflux.createStore({

  init() {
    this.telekomand = {id: 'xxxxxxxxxx', state: 'undefined'}
    this.listenToMany(ApplicationActions)
  },

  getInitialState() {
    return {telekomand: this.telekomand}
  },

  onBootstrap() {
    Telekomand.turnOn(ConnectorsList.PEERJS)

    Telekomand.on('telekomand.ready', (id) => {
      this.telekomand.id = id
      this.trigger({telekomand: this.telekomand})
    })

    Telekomand.on('remote.command', (command) =>
      PresentatorActions.navigateSlide(command))
  }

})
