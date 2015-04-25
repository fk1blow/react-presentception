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

export default class TelekomandFacade {

  constructor(connector, presenterControl, remoteControl) {
    this._connector = connector
    this._presenterControl = presenterControl
    this._remoteControl = remoteControl
    this._attachConnectorHandlers()
    this._attachControlsHandlers()
  }

  /*
    Connects to another peer becoming its 'remote' counterpart.
    If the Telekomand is already engaged, this will return false

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

  _attachConnectorHandlers() {
    this._connector.on('peer.initialize', peerId =>
      this.emit('telekomand.ready', peerId))

    this._connector.on('peer.connection_error', err =>
      this.emit('telekomand.error', err))

    this._connector.on('peer.wrapper_error', err =>
      this.emit('telekomand.error', err))
  }

  _attachControlsHandlers() {
    this._remoteControl.onEngage = () => {
      console.log('remeote control has engaged a presenter')
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
