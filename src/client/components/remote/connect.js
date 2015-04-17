import React from 'react';
import {Link} from 'react-router';

class RemoteConnect extends React.Component {

  onConnect() {
    console.log('peers should start connecting')
  }

  render() {
    return(
      <div id="remote-connect" className="mw8 center phm phl-ns">
        <h1 className="f1-ns normal">Remote connect</h1>

        <section>
          <h3>Connect to a specific peer</h3>

          <p>
            Get the key of the remote/app and then establish a connection with that endpoint:
          </p>

          <p>
            <input type="text" className="input mrs" placeholder="other peer key" />
            <button onClick={this.onConnect.bind(this)} className="btn">connect</button>
          </p>
        </section>

        <section>
          <h3>Remote control</h3>

          <p>
            Now in order to <em>control</em> a specific presentation, you have
            to go to the <Link to="remote-control" className="phxs hover-dark-gray">remote control</Link> endpoint.
          </p>
        </section>
      </div>
    );
  }

}

export default RemoteConnect;
