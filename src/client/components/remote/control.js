import React from 'react';
import Telekomand from '../../../lib/telekomand/telekomand';

class RemoteControl extends React.Component {

  onButtonUp() {
    Telekomand.sendCommand('UP')
  }

  onButtonDown() {
    Telekomand.sendCommand('DOWN')
  }

  onButtonPrev() {
    Telekomand.sendCommand('LEFT')
  }

  onButtonNext() {
    Telekomand.sendCommand('RIGHT')
  }

  render() {
    return(
      <div id="remote-control" className="mw8 center phl-ns bg-light-blue">
        <div className="container pos-abs left-0 top-0 w-100 h-100">
          <button onClick={this.onButtonUp.bind(this)} className="btn-up icon-arrow-up2"></button>

          <div className="container container--vbox middle-box">
            <button onClick={this.onButtonPrev.bind(this)} className="btn-directional icon-arrow-left2 input-invisible"></button>
            <button onClick={this.onButtonNext.bind(this)} className="btn-directional icon-arrow-right2 input-invisible"></button>
          </div>

          <button onClick={this.onButtonDown.bind(this)} className="btn-down icon-arrow-down2 input-invisible"></button>
        </div>
      </div>
    );
  }

}

export default RemoteControl;
