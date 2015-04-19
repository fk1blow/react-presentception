/*
  The Telekomand object is the
  façade of `Telekomand` api,
  used to facilitate the connection
  between two peers.
 */

import {EventEmitter} from 'eventemitter3'
import TelekomandFacade from './telekomand-facade'
import PeerjsConnector from './peerjs-connector'
import PresenterControl from './presenter-control'
import RemoteControl from './remote-control'
import TelekomandModes from './telekomand-modes'

// gracefully fuck by peerjs `window` requirements
global.window = global.window || {}
window.postMessage = function() {}

// TODO: rename
const ConnectorsAvailable = {
  PEERJS: PeerjsConnector,
  FOO_CONNECTORJS: undefined
}

// TOBEREMOVED
/*const initializeConnector = function() {
  const Connector = ConnectorProvider.connector()
  Connector.on('initialize', (id) => {
    console.log("this.info:", TelekomandFacade.info())
    TelekomandFacade.emit('ready', TelekomandFacade.info())
  })
  Connector.on('become_host', () => {
    ActiveState = TelekomandModes.PRESENTER
    TelekomandFacade.emit('become_remote')
  })
  Connector.on('become_master', () => {
    ActiveState = TelekomandModes.REMOTE
    TelekomandFacade.emit('become_presenter')
  })
  return TelekomandFacade
}*/

/*
  The current active connector
 */
// var ActiveConnector = null

// TOBEREMOVED
const TelekomandConnector = {

  connector: null,

  attachConnectorListeners() {
    const connector = TelekomandConnector.connector
    connector.on('initialize', (id) => {
      console.log("this.info:", TelekomandFacade.info())
      TelekomandFacade.emit('ready', TelekomandFacade.info())
    })
    connector.on('become_host', () => {
      ActiveState = TelekomandModes.PRESENTER
      TelekomandFacade.emit('become_remote')
    })
    connector.on('become_master', () => {
      ActiveState = TelekomandModes.REMOTE
      TelekomandFacade.emit('become_presenter')
    })
  }

}

/*
  Telekomand provider
 */
const Telekomand = {

  facade: null,

  initialize() {
    if (!Telekomand.facade) {
      Telekomand.facade =
        this.buildFacade(ConnectorsAvailable.PEERJS, TelekomandModes.NEUTRAL)
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

// TOBEREMOVED
/*
  Telekomand façade
 */
// const TelekomandFacade = {

//   /*
//     It establishes a connection between a Presenter
//     and a Remote(or the other way around).

//     @param [string] presenterId
//    */
//   engagePresenter(presenterId) {
//     ConnectorProvider.connector().connectToPeer(presenterId)
//   },


//     It disconnects from the currently remote presenter
//     @return [boolean] true if a presenter was disconnected, false if
//     no active presenter

//   disengagePresenter() {
//     if (presenter) {
//       presenter.leave()
//       return true
//     } else
//       return false
//   },

//   /*
//     Retrieve the details about the Telekomand current state

//     TODO: call the appropriate object that will provide this response
//     TODO: refactor hardcoded info details
//    */
//   info() {
//     return {
//       id: TelekomandConnector.connector.getPeerId(),
//       state: ActiveState
//     }
//   }

// }

export default Telekomand.initialize()
