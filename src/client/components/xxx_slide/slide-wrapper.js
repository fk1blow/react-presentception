import React from 'react';
import {RouteHandler} from 'react-router';

class PresentationSlide extends React.Component {

  render() {
    const ext = '.js';
    const presentationDir = 'p' + this.props.presentation + '/';
    const slidePath = 'slide-' + this.props.slide + '-0' + ext;
    const SlideComponent = require('../../../../slides/'
      + presentationDir + slidePath);

    return (
      <SlideComponent />
    );
  }

}

PresentationSlide.defaultProps = {
  presentation: null,
  slide: 0
}

export default PresentationSlide;
