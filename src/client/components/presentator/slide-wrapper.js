import React from 'react';
import {RouteHandler} from 'react-router';

class SlideWrapper extends React.Component {

  // TODO: use react's prop types
  componentDidMount() {
    if (this.props.onSliderMounted instanceof Function) {
      this.props.onSliderMounted();
    }
  }

  // TODO: use react's prop types
  componentWillUnmount() {
    if (this.props.onSliderUnmounted instanceof Function) {
      this.props.onSliderUnmounted();
    }
  }

  // TODO: add some defensive code
  getSlideComponent() {
    const {id, slide} = this.props.presentation;
    const ext = '.js';
    const presentationDir = 'p' + id + '/';
    const slidePath = 'slide-' + slide + '-0' + ext;
    return require('../../../../slides/' + presentationDir + slidePath);
  }

  render() {
    const SlideComponent = this.getSlideComponent();
    return (
      <SlideComponent />
    )
  }

}

SlideWrapper.contextTypes = {
  router: React.PropTypes.func
}

export default SlideWrapper;
