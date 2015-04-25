import React from 'react';
import classNames from 'classnames';

const noop = function() {}

class PageControls extends React.Component {

  render() {
    return (
      <div id="page-controls">
        <button
          onClick={() => this.props.onLeftNav()}
          className={classNames("icon-arrow-left2 phs pvs",
            {'inactive': !this.props.className.leftActive})} />

        <button
          onClick={() => this.props.onUpNav()}
          className={classNames("icon-arrow-up2 phs pvs",
            {'inactive': true})} />

        <button
          onClick={() => this.props.onDownNav()}
          className={classNames("icon-arrow-down2 phs pvs",
            {'inactive': true})} />

        <button
          onClick={() => this.props.onRightNav()}
          className={classNames("icon-arrow-right2 phs pvs",
            {'inactive': !this.props.className.rightActive})} />
      </div>
    );
  }

}

PageControls.defaultProps = {
  onLeftNav: noop,
  onUpNav: noop,
  onDownNav: noop,
  onRightNav: noop
}

export default PageControls;
