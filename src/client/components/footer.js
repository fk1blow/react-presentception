import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <footer id="footer" className=" mw8 center phl dn-xs w-100 pvm-ns bt b--light-gray gray bg-white">
        <div className="f5 center db tc lh-copy">
          telekomand info is <span className="bold">{this.props.telekomandInfo.id}</span>,
          and the current state <span className="bold">{this.props.telekomandInfo.state}</span>
        </div>
      </footer>
    );
  }

}
