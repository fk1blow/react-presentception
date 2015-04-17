import React from 'react';
import classNames from 'classnames';

class RemoteControls extends React.Component {

  render() {
    const containerCls = classNames('mw8 center phl-ns bg-gray', {
      'dn': !this.props.active,
      'container': this.props.active
    });

    return (
      <div id="remote-details" className={containerCls}>
        <button className="btn-up icon-arrow-up2"></button>

        <div className="container container--vbox middle-box">
          <button className="btn-directional icon-arrow-left2 input-invisible"></button>
          <button className="btn-directional icon-arrow-right2 input-invisible"></button>
        </div>

        <button className="btn-down icon-arrow-down2 input-invisible"></button>
      </div>
    )
  }

}

RemoteControls.defaultProps = {
  active: false
}

export default RemoteControls;
