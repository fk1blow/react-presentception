import React from 'react';

class RemoteControl extends React.Component {

  render() {
    return(
      <div id="remote-control" className="mw8 center phl-ns bg-light-blue">
        <div className="container pos-abs left-0 top-0 w-100 h-100">
          <button className="btn-up icon-arrow-up2"></button>

          <div className="container container--vbox middle-box">
            <button className="btn-directional icon-arrow-left2 input-invisible"></button>
            <button className="btn-directional icon-arrow-right2 input-invisible"></button>
          </div>

          <button className="btn-down icon-arrow-down2 input-invisible"></button>
        </div>
      </div>
    );
  }

}

export default RemoteControl;
