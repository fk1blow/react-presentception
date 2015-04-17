import React from 'react';
import classNames from 'classnames';
import {RouteHandler, Link} from 'react-router';
import Reflux from 'reflux';

import PageControls from './page-controls';
import SlideNavigation from '../navigation/slide-navigation';
import PresentatorStore from '../../stores/presentator/store';
import PresentatorActions from '../../stores/presentator/actions';

const noop = function() {};

/*
  TODO: #refactor responsabilites

  Instead of having to many handlers laying around inside the Presentator,
  there should be another component involved, taking over the `handling`
  part of the greater role.
  Name it `Slider`


  TODO: #refactor role

  It receives `slide` events from differrent delegating objects.
  The delegates are react components or just plain js objects.

  TODO: #reflux and es6 classes

  integrate reflux(connect) with es6 classes - no mixins or extends

 */
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

  componentWillMount() {
    this.slideNavigation = new SlideNavigation();
    this.slideNavigation.onNextSlide = this.shouldPresentNextSlide;
    this.slideNavigation.onPrevSlide = this.shouldPresentPrevSlide;
  },

  componentWillUnmount() {
    // is there really a need for null fing the callbacks?
    this.slideNavigation.onNextSlide = null;
    this.slideNavigation.onPrevSlide = null;
    this.slideNavigation = null;
  },

  // TODO: refactor @#2
  onSlidePresented() {
    const presentation = this.currentPresentation();
    PresentatorActions.presentationStarted(presentation);
    this.slideNavigation.activate();
    // TODO: should pass the slide that has been presented??
    this.props.onDidPresent({index: 'hardcoded 1'});
  },

  // TODO: refactor @#2
  onSlideRemoved() {
    PresentatorActions.presentationEnded();
    this.slideNavigation.deactivate();
    // TODO: should pass the slide that has been presented??
    this.props.onWillHide({index: 'hardcoded 1'});
  },

  // TODO: refactor @#2
  shouldPresentNextSlide() {
    const {id, slide, endIndex, startIndex} = this.currentPresentation();
    const nextIndex = slide + 1;
    if (nextIndex > endIndex) return;
    this.gotoSlide({index: nextIndex});
  },

  // TODO: refactor @#2
  shouldPresentPrevSlide() {
    const {id, slide, endIndex, startIndex} = this.currentPresentation();
    const prevIndex = slide - 1;
    if (prevIndex < startIndex) return;
    this.gotoSlide({index: prevIndex});
  },

  // TODO: refactor @#2
  gotoSlide(index) {
    PresentatorActions.toNextSlide({
      id, slide: index, startIndex, endIndex
    });
    this.context.router.transitionTo('slide-presentation',
      {id, index});
  },

  // TODO: refactor to use `this.gotoSlide()` for navigation
  /*shouldPresentPrevSlide() {
    const {id, slide, endIndex, startIndex} = this.currentPresentation();
    const prevIndex = slide - 1;
    if (prevIndex < startIndex) return;
    PresentatorActions.toPrevSlide({
      id, slide: prevIndex, startIndex, endIndex
    });
    this.context.router.transitionTo('slide-presentation',
      {id, index: prevIndex});
  },*/

  // TODO: rename handler
  // TODO: refactor @#2
  onCloseModal() {
    this.props.onShouldHide();
  },

  currentPresentation() {
    const {id, index} = this.context.router.getCurrentParams();
    return {
      id: parseInt(id),
      slide: parseInt(index),
      startIndex: this.props.startIndex,
      endIndex: this.props.endIndex
    };
  },

  render() {
    const presentatorCls = classNames('w-100 h-100 brs bg-silver', {
      'dn': !this.state.active
    });

    const controlsCls = {
      'leftActive': !this.state.atSlideStart,
      'rightActive': !this.state.atSlideEnd
    };

    return (
      <div id="presentator" className={presentatorCls}>
        <button onClick={this.onCloseModal}
                title="close the presentation"
                className="pos-abs right-0 tc black close-btn input-invisible small">
          ESC
        </button>

        <PageControls
          className={controlsCls}
          onLeftNav={this.shouldPresentPrevSlide}
          onRightNav={this.shouldPresentNextSlide} />

        <RouteHandler
          presentation={this.currentPresentation()}
          onSlidePresented={() => this.onSlidePresented()}
          onSlideRemoved={this.onSlideRemoved} />
      </div>
    )
  }
});

export default Presentator;
