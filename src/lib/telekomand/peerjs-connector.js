/*
  PeerjsConnector
 */

import {EventEmitter} from 'eventemitter3'
import ObjectAssign from 'object-assign'
import Peer from 'peerjs'

class PeerjsConnector {

  constructor() {
    this._wrapper = this._createWrapper()
    this._connection = null
    this._peerId = undefined
    this._attachWrapperListeners()
  }

  connectToPeer(peerId) {
    if (typeof peerId !== 'string')
      throw new TypeError('invalid peerId param type', typeof peerId)
    if (!this._connection)
      this._createPeerConnection(peerId)
  }

  disconnectFromPeer() {
    console.log('should disconnect from the current peer')
  }

  get peerId() {
    return this._peerId
  }

  sendMessage(message) {
    if (this._connection)
      this._connection.send(message)
  }

  _createWrapper() {
    const peerWrapper = new Peer({
      // TODO: this was taken from a demo - replace with your own
      key: 'x7fwx2kavpy6tj4i',
      debug: 3,
      logFunction: function() {
        var logs = Array.prototype.slice.call(arguments).join(' ')
        // console.log("wrapper log:", logs)
      }
    })

    return peerWrapper
  }

  _createPeerConnection(peerId) {
    this._connection = this._wrapper.connect(peerId, {
      label: 'chat',
      serialization: 'none',
      metadata: {message: 'hi i want to chat with you!'}
    })
    this._connection.on('open', () => this.emit('become_master'))
    this._connection.on('error', err => this.emit('connection_error', err))
  }

  _attachWrapperListeners() {
    this._wrapper.on('open', id => {
      this._peerId = id
      this.emit('open', id)
    })
    this._wrapper.on('connection', dataConnection =>
      this.emit('become_host', dataConnection))
    this._wrapper.on('error', err =>
      this.emit('wrapper_error', err))
  }

}

ObjectAssign(PeerjsConnector.prototype, EventEmitter.prototype)

export default PeerjsConnector
