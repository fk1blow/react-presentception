import React from 'react';
import {RouteHandler} from 'react-router';

class SlideWrapper extends React.Component {

  // TODO: add some defensive code
  getSlideComponent() {
    var {id, index} = this.props.presentation
    const ext = '.js';
    if (index === 0) {
      console.warn('deal with zero index router slides')
      index = 1
    }
    const presentationDir = 'p' + id + '/';
    const slidePath = 'slide-' + index + '-0' + ext;
    return require('../../../../slides/' + presentationDir + slidePath);
  }

  render() {
    const SlideComponent = this.getSlideComponent();
    return (
      <SlideComponent/>
    )
  }

}

SlideWrapper.contextTypes = {
  router: React.PropTypes.func
}

export default SlideWrapper;
