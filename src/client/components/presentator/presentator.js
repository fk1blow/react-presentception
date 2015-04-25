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
      startIndex: 1,
      endIndex: 1,
      onShouldHide: noop,
      onDidPresent: noop,
      onWillHide: noop
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  onSliderMounted() {
    PresentatorActions.presentationStarted(this.currentPresentation())
    this.props.onDidPresent({index: 'hardcoded 1'})
  },

  onSliderUnmounted() {
    PresentatorActions.presentationEnded()
    this.props.onWillHide({index: 'hardcoded 1'})
  },

  onCloseModal() {
    this.props.onShouldHide()
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

  currentPresentation() {
    const {id, index} = this.context.router.getCurrentParams()
    return {
      id: parseInt(id),
      slide: parseInt(index),
      startIndex: this.props.startIndex,
      endIndex: this.props.endIndex
    }
  },

  render() {
    const presentatorCls = classNames('w-100 h-100 brs bg-silver', {
      'dn': !this.state.active
    })
    const controlsCls = {
      'leftActive': !this.state.atSlideStart,
      'rightActive': !this.state.atSlideEnd
    }
    const {id} = this.context.router.getCurrentParams()
    const routeParams = {id, index: this.state.slide}

    return (
      <ActionNavigator enable={this.state.active} onKeyNavigation={this.onKeyNavigation}>
        <div id="presentator" className={presentatorCls}>
          <button
            onClick={this.onCloseModal}
            title="close the presentation"
            className="pos-abs right-0 tc black close-btn input-invisible small"
            label="asdasd">ESC</button>

          <PageControls
            className={controlsCls}
            onLeftNav={this.onPageControlLeftNav}
            onRightNav={this.onPageControlRightNav} />

          <DynamicRouteHandler
            routeParams={routeParams}
            presentation={this.currentPresentation()}
            onSliderMounted={this.onSliderMounted}
            onSliderUnmounted={this.onSliderUnmounted} />
        </div>
      </ActionNavigator>
    )
  }
})

export default Presentator
