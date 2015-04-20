import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer id="footer" className="w-100 center phl dn-xs pvm-ns bt b--light-gray gray bg-white">
        <div className="f5 db tc lh-copy">
          telekomand info is <span className="bold">{this.props.telekomandInfo.id}</span>,
          and the current state <span className="bold">{this.props.telekomandInfo.state}</span>
        </div>
      </footer>
    );
  }

}
