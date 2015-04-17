import React from 'react';
import {RouteHandler, Link} from 'react-router';
import classNames from 'classnames';

class CloseButton extends React.Component {

  onClick() {
    // if ('undefined' != typeof this.props.onClick) {
    //   this.props.onClick();
    // }
  }

  render() {
    const params = this.context.router.getCurrentParams();

    return (
      <div className="close-btn pos-abs right-0">
        <Link onClick={(e) => this.onClick}
          to="presentation"
          params={{id: params.id}}
          title="close the presentation" className="db phm pvs tc silver none btn--s">ESC</Link>
      </div>
    );
  }

}

CloseButton.contextTypes = {
  router: React.PropTypes.func
};

export default CloseButton;
