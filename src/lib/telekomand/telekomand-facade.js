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
import TelekomandModes from './telekomand-modes'

export default class TelekomandFacade {

  constructor(connector, presenterControl, remoteControl, initialMode) {
    this._connector = connector
    this._presenterControl = presenterControl
    this._remoteControl = remoteControl
    this._commandMode = initialMode
    this._attachConnectorHandlers()
    this._attachControlHandlers()
  }

  /*
    Connects to another peer becoming its 'remote' counterpart.
    If the Telekomand is already engaged, this will return false

    @param [string] peerId the id of the presenter peer
    @return [bool] false if already engaged, true otherwise
   */
  engagePresenter(peerId) {
    this._remoteControl.connectToPresenter(peerId)
  }

  /*
    Leaves the currently engaged presenter.

    @return [bool] false if no engaged presenter, true otherwise
   */
  leavePresenter() {
    console.log('should leave the engaged presenter')
  }

  _attachConnectorHandlers() {
    this._connector.on('peer.initialize', (peerId) => {
      this.emit('telekomand.ready', peerId)
      console.log("peerId:", peerId)
    })

    this._connector.on('peer.connection_error',
      err => this.emit('telekomand.error', err))

    this._connector.on('peer.wrapper_error',
      err => this.emit('telekomand.error', err))
  }

  _attachControlHandlers() {
    this._remoteControl.onEngage = () => {
      console.log('remeote control has engaged a presenter')
    }

    this._presenterControl.onEngage = () => {
      console.log('presenter has been engaged by a remote')
    }
  }

}

ObjectAssign(TelekomandFacade.prototype, EventEmitter.prototype)
