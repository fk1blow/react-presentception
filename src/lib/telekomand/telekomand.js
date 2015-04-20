/*
  The Telekomand object is the
  façade of `Telekomand` api,
  used to facilitate the connection
  between two peers.
 */

import {EventEmitter} from 'eventemitter3'
import TelekomandFacade from './telekomand-facade'
import PresenterControl from './presenter-control'
import RemoteControl from './remote-control'
import TelekomandModes from './telekomand-modes'
import ConnectorsList from './connectors'

// gracefully fucked by peerjs `window` requirements
global.window = global.window || {}
window.postMessage = window.postMessage ||  function() {}

/*
  Telekomand provider
 */
const Telekomand = {

  facade: null,

  initialize() {
    if (!Telekomand.facade) {
      Telekomand.facade =
        this.buildFacade(ConnectorsList.PEERJS, TelekomandModes.NEUTRAL)
    }
    return Telekomand.facade
  },

  buildConnector(connectorType) {
    if (connectorType && typeof connectorType !== 'function')
      throw new TypeError('invalid connectorType parameter of ', typeof connectorType)
    return new connectorType()
  },

  buildFacade(connectorType, defaultMode) {
    const connector = Telekomand.buildConnector(connectorType)
    const presenter = new PresenterControl(connector)
    const remote = new RemoteControl(connector)
    return new TelekomandFacade(connector, presenter, remote, defaultMode)
  }

}

export default Telekomand.initialize()
