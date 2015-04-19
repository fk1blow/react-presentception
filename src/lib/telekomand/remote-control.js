/*
  The `Remote` is an `actor` that
  has the role to send command/messages
  to another peer entity - the Presenter.

  It uses the standard 'Kommand' protocol that
  defines a clear set of commands that will be
  exchanged between Remote and Presenter.
 */

class RemoteControl {

  constructor(connector) {
    this.onEngage = function() {} // noop by default
    this._connector = connector
    this._engaged = false
    this._connector.on('peer.become_master', () => this.handlePeerHasEngage())
  }

  connectToPresenter(presenterId) {
    this._connector.connectToPeer(presenterId)
  }

  handlePeerHasEngage() {
    this._engaged = true
    this.onEngage()
  }

}

export default RemoteControl;
