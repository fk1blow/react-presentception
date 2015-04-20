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

  getPeerId() {
    return this._peerId
  }

  sendMessage(message) {
    if (this._connection)
      this._connection.send(message)
  }

  _createWrapper() {
    const peerWrapper = new Peer({
      key: '17ilpd57vbexko6r',
      debug: 3,
      logFunction: function() {
        var copy = Array.prototype.slice.call(arguments).join(' ')
        // console.log("logFunction:", copy)
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
    this._connection.on('open', () => this.emit('peer.become_master'))
    this._connection.on('error', err => this.emit('peer.connect_error', err))
  }

  _attachWrapperListeners() {
    this._wrapper.on('open', id => {
      this._peerId = id
      this.emit('peer.initialize', id)
    })
    this._wrapper.on('connection', dataConnection =>
      this.emit('peer.become_host', dataConnection))
    this._wrapper.on('error', err =>
      this.emit('peer.wrapper_error', err))
  }

}

ObjectAssign(PeerjsConnector.prototype, EventEmitter.prototype)

export default PeerjsConnector
