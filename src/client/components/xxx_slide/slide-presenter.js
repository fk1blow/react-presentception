import React from 'react';
import {RouteHandler, Link} from 'react-router';
import classNames from 'classnames';
import PageControls from './PageControls';
import CloseButton from './CloseButton';

// TODO: rename to presenter or something...
class Presentation extends React.Component {

  shouldClosePresenter() {
    const params = this.context.router.getCurrentParams();
    this.context.router.transitionTo('presentation', {id: params.id});
  }

  render() {
    const params = this.context.router.getCurrentParams();
    const elCls = classNames('w-100 h-100 brs bg-silver', {
      'active': params.index || false
    });

    return (
      <div id="presentator" className={elCls}>
        <CloseButton onClick={this.shouldClosePresenter} />
        <PageControls />
        <RouteHandler presentation={params.id} slide={params.index} />
      </div>
    );
  }

}

Presentation.contextTypes = {
  router: React.PropTypes.func
};

export default Presentation;
