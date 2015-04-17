import React from 'react';
import classNames from 'classnames';

class NiceButton extends React.Component {
  render() {
    const btnCls = classNames(this.props.className, {
      'nice-button': true
    });

    return (
      <div className={btnCls}>
        {this.props.children}
      </div>
    );
  }
}

export default NiceButton;
