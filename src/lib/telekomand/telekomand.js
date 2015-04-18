/*
  The Telekomand object is the
  façade of `Telekomand` api,
  used to facilitate the connection
  between two peers.
 */

import Presenter from './presenter';


const Telekomand_States = {
  NEUTRAL: 1,
  PRESENTER: 2,
  REMOTE: 3
}

var presenter = null;

export default {

  /*
    It establishes a connection between a Presenter
    and a Remote(or the other way around).

    @param [string] presenterId
   */
  engagePresenter(presenterId) {
    if (presenter instanceof Presenter)
      return false;
    if (!presenterId)
      throw new TypeError(`Invalid presenterId parameter of ${typeof presenterId}`);
    presenter = new Presenter(presenterId);
  },

  /*
    It disconnects from the currently remote presenter

    @return [boolean] true if a presenter was disconnected, false if
    no active presenter
   */
  leavePresenter() {
    if (presenter) {
      presenter.leave();
      return true;
    } else
      return false;
  },

  /*
    Retrieve the details about the Telekomand current state
   */
  info() {
    return {
      id: '11318fopjs83hal85421',
      state: Telekomand_States.NEUTRAL
    }
  },

  /*
    TBD
   */
  // disconnectFromRemote() {
  //   console.log('should disconnect from a peer remote?')
  // },

  /*
    TBD
   */
  // currentState() {
  //   console.log('should provide the current state of the telekomand?')
  // }

}
