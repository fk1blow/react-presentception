import React from 'react';
import {RouteHandler} from 'react-router';

class PresentationSlide extends React.Component {

  componentDidMount() {
    console.log("this.context:", this.context)
  }

  render() {
    return (
      <p>the slide page...</p>
    )
  }

}

PresentationSlide.contextTypes = {
  fruit: React.PropTypes.string.isRequired,
  router: React.PropTypes.func
}

/*PresentationSlide.contextTypes = {
  router: React.PropTypes.func
};*/

export default PresentationSlide;
