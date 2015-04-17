import React from 'react';
import {RouteHandler} from 'react-router';

class SlideWrapper extends React.Component {

  componentDidMount() {
    if (this.props.onSlidePresented instanceof Function) {
      this.props.onSlidePresented();
    }
  }

  componentWillUnmount() {
    if (this.props.onSlideRemoved instanceof Function) {
      this.props.onSlideRemoved();
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
