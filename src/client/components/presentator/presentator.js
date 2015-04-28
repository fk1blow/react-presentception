import React from 'react'
import classNames from 'classnames'
import {RouteHandler, Link} from 'react-router'
import Reflux from 'reflux'

import PresentatorStore from '../../stores/presentator/store'
import PresentatorActions from '../../stores/presentator/actions'
import PageControls from './page-controls'
import ActionNavigator from '../../components/action-navigator'
import DynamicRouteHandler from '../../components/dynamic-route-handler'

const noop = function() {}

const Presentator = React.createClass({

  mixins: [Reflux.connect(PresentatorStore)],

  getDefaultProps() {
    return {
      onWillHide: noop,
      onWillSlide: noop
    }
  },

  componentDidMount() {
    PresentatorStore.listenTo(PresentatorActions.didUpdateSlide,
      this.props.onWillSlide)
  },

  componentWillReceiveProps(props) {
    const {routeParams} = props
    if (routeParams && routeParams != this.props.routeParams)
      PresentatorActions.didNavigateToSlide(parseInt(routeParams.index))
  },

  onKeyNavigation(keyType) {
    PresentatorActions.navigateSlide(keyType)
  },

  onPageControlLeftNav() {
    PresentatorActions.navigateSlide('LEFT')
  },

  onPageControlRightNav() {
    PresentatorActions.navigateSlide('RIGHT')
  },

  render() {
    const presentatorCls = classNames('w-100 h-100 brs bg-silver', {
      'dn': !this.state.active
    })
    const controlsCls = {
      'leftActive': !this.state.atSlideStart,
      'rightActive': !this.state.atSlideEnd
    }
    const {id} = this.props.routeParams
    var routeParams = {id, index: this.state.slide}

    return (
      <ActionNavigator enable={this.state.active} onKeyNavigation={this.onKeyNavigation}>
        <div id="presentator" className={presentatorCls}>
          <button
            onClick={this.props.onWillHide}
            title="close the presentation"
            className="pos-abs right-0 tc black close-btn input-invisible small"
            label="asdasd">ESC</button>

          <PageControls
            className={controlsCls}
            onLeftNav={this.onPageControlLeftNav}
            onRightNav={this.onPageControlRightNav} />

          <RouteHandler presentation={routeParams} />
        </div>
      </ActionNavigator>
    )
  }
})

export default Presentator
