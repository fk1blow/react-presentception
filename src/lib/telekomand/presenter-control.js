/*
  The Presenter is an `actor` that has the
  role the receive and process commands
  coming from a peer entity - the Reomote.

  It uses the standard 'Kommand' protocol that
  defines a clear set of commands that will be
  exchanged between Remote and Presenter.
 */

class PresenterControl {

  constructor(connector) {
    this.onEngage = function() {} // noop by default
    this._connector = connector
    this._engaged = false
    this._connector.on('peer.become_host', () => this.handlePeerHasEngage())
  }

  disconnectFromRemote() {
    this._connector.disconnectFromPeer()
  }

  handlePeerHasEngage() {
    this._engaged = true
    this.onEngage()
  }

}

export default PresenterControl;
