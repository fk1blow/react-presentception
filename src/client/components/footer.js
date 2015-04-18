import React from 'react';

export default class Footer extends React.Component {

  render() {
    return (
      <div id="footer" className="w-100 pvm-ns bt b--light-gray gray bg-white">
        <footer className="mw8 center phl">
          <div className="f5 db center lh-copy">
            telekomand info is <span className="bold">{this.props.telekomandInfo.id}</span>,
            and the current state <span className="bold">{this.props.telekomandInfo.state}</span>
          </div>
        </footer>
      </div>
    );
  }

}
