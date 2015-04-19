/*
  TelekomandConnector
 */



/*
  Facade of the telekomand connector
 */
export default {

  connectToPeer(peerId) {
    ConnectorProvider.connector().connectToPeer(peerId)
  },

  connector() {
    return ConnectorProvider.connector()
  }

}
