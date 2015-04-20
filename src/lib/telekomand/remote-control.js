/*
  The `Remote` is an `actor` that
  has the role to send command/messages
  to another peer entity - the Presenter.

  It uses the standard 'Kommand' protocol that
  defines a clear set of commands that will be
  exchanged between Remote and Presenter.
 */

import Kommands from './kommands'

class RemoteControl {

  constructor(connector) {
    this.onEngage = function() {}
    this._connector = connector
    this._engaged = false
    this._connector.on('peer.become_master', () => this.handlePeerHasEngage())
  }

  connectToPresenter(presenterId) {
    if (this.hasEngaged()) {
      return false
    } else {
      this._connector.connectToPeer(presenterId)
      return true
    }
  }

  disconnectFromPresenter() {
    if (this.hasEngaged()) {
      this._connector.disconnectFromPeer()
      return true
    } else {
      return false
    }
  }

  sendCommand(command) {
    if (this._validateCommand(command))
      this._connector.sendMessage(command)
  }

  hasEngaged() {
    return this._engaged
  }

  handlePeerHasEngage() {
    this._engaged = true
    this.onEngage()
  }

  _validateCommand(command) {
    return command in Kommands
  }

}

export default RemoteControl;
