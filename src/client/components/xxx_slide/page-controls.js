import React from 'react';
import classNames from 'classnames';

class PageControls extends React.Component {

  render() {

    return (
      <div id="page-controls">
        <button className="icon-arrow-left2 phs pvs dark-gray" />
        <button className="icon-arrow-up2 phs pvs light-silver inactive" />
        <button className="icon-arrow-down2 phs pvs light-silver inactive" />
        <button className="icon-arrow-right2 phs pvs dark-gray" />
      </div>
    );
  }

}

export default PageControls;
