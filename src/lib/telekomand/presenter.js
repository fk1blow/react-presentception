/*
  The Presenter is a peer entity that has the
  role the receive and process commands
  coming from a peer entity - the Reomote.

  It uses the standard 'Kommand' protocol that
  defines a clear set of commands that will be
  exchanged between Remote and Presenter.
 */

class Presenter {

  constructor() {
    console.log('should construct the Presenter');
  }

  leave() {
    console.log('should leave the peer mode - disconnect')
  }

}

export default Presenter;
