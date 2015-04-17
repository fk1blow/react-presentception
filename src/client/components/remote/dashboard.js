import React from 'react';
import {Link} from 'react-router';

class RemoteDashboard extends React.Component {

  render() {
    return(
      <div id="remote" className="mw8 center phm phl-ns">
        <h1 className="f1-ns normal">Remote</h1>

        <p>
          How this works? It needs two users that use peerjs api
          in order to discover themselves. One needs a simple
          key preresenting the id of an user, then use that key
          it to create a rtcpeerconnection between the two.
        </p>

        <section>
          <h3>Accept incoming connection from peers</h3>

          <p>
            Use this id <span className="white bg-silver">12121113123</span> that would allow
            a peer to connect to <em>this</em> particular app.
          </p>
        </section>

        <section>
          <h3>Connect to other peers</h3>

          <p>
            In order to connect to other peers, you must go to
            the <Link to="remote-connect" className="phxs hover-dark-gray">connect</Link> page. There you
            can use a peer id to establish a remotedataconnection.
          </p>
        </section>
      </div>
    );
  }

}

export default RemoteDashboard;
