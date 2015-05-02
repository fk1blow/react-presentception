/*
  Telekomand facade is the public interface
  of the Telekomand api.
  It engages with remotes, it can become a
  presenter and it can receive events from
  various connected peer, both as a remote
  or as a presenter.
 */

import {EventEmitter} from 'eventemitter3'
import ObjectAssign from 'object-assign'
import PresenterControl from './presenter-control'
import RemoteControl from './remote-control'

// gracefully fucked by peerjs `window` requirements
global.window = global.window || {}
window.postMessage = window.postMessage ||  function() {}

class TelekomandFacade {

  constructor() {
    this._connector = null
    this._presenterControl = null
    this._remoteControl = null
    this._turnedOn = false
  }

  /*
    It turns on the telekomand by creating all the necessary object
    in order to properly function

    @param [object] connector the connector type to use
   */
  turnOn(connector) {
    if (this._turnedOn === true)
      throw new Error('Telekomand already turned on')
    this._connector = this._buildConnector(connector)
    this._presenterControl = new PresenterControl(this._connector)
    this._remoteControl = new RemoteControl(this._connector)
    this._attachConnectorHandlers()
    this._attachRemoteControlHandlers()
    this._turnedOn = true
  }

  /*
    Connects to another peer becoming its 'remote' counterpart.
    If the Telekomand it should already engaged, this will return false

    @param [string] peerId the id of the presenter peer
    @return [bool] false if already engaged, true otherwise
   */
  engagePeer(peerId) {
    this._remoteControl.connectToPresenter(peerId)
  }

  /*
    Leaves the currently engaged presenter and disconnects from peer

    @return [bool] false if no engaged presenter, true otherwise
   */
  leavePeer() {
    console.log('should leave the engaged presenter')
  }

  /*
    Uses the remote to send a message to the presenter

    @param [string] message the message/command sent to presenter
   */
  sendCommand(command) {
    this._remoteControl.sendCommand(command)
  }

  _buildConnector(connector) {
    const connectorType = typeof connector
    if (connectorType !== 'function')
      throw new TypeError('invalid connectorType parameter of ', connectorType)
    return new connector()
  }

  _attachConnectorHandlers() {
    this._connector.on('open', peerId =>
      this.emit('telekomand.ready', peerId))

    this._connector.on('connection_error', err =>
      this.emit('telekomand.error', err))

    this._connector.on('wrapper_error', err =>
      this.emit('telekomand.error', err))
  }

  _attachRemoteControlHandlers() {
    this._remoteControl.onEngage = () => {
      console.log('remote control has engaged a presenter')
      this.emit('remote.engage')
    }

    this._presenterControl.onEngage = () => {
      console.log('presenter has been engaged by a remote')
      this.emit('presentator.engage')
    }

    this._presenterControl.onCommand = (command) => {
      console.log('presenter received command', command)
      this.emit('remote.command', command)
    }
  }

}

ObjectAssign(TelekomandFacade.prototype, EventEmitter.prototype)

export default new TelekomandFacade()
