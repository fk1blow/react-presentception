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
    this.onEngage = function() {}
    this.onCommand = function() {}
    this._connector = connector
    this._engaged = false
    this._connector.on('peer.become_host', this.handlePeerHasEngage.bind(this))
  }

  disconnectFromRemote() {
    this._connector.disconnectFromPeer()
  }

  hasEngaged() {
    return this._engaged
  }

  handlePeerHasEngage(connection) {
    this._engaged = true
    this.onEngage()
    connection.on('data', (data) => {
      this.onCommand(data)
    })
  }

}

export default PresenterControl;
