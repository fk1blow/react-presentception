import React from 'react';
import {RouteHandler, Link} from 'react-router';

import Presentator from '../presentator/presentator'
import PresentatorActions from '../../stores/presentator/actions';

class PresentationDetails extends React.Component {

  constructor(props) {
    super(props)
    this.hardcodedTotalSlides = 6
  }

  componentDidMount() {
    const routeParams = this.context.router.getCurrentParams()
    if(parseInt(routeParams.index) > 0) {
      PresentatorActions.presentationStarted(routeParams.index,
        this.hardcodedTotalSlides)
    }
  }

  componentWillUnmount() {
    PresentatorActions.presentationEnded()
  }

  onBtnShowClick() {
    PresentatorActions.presentationStarted(1, this.hardcodedTotalSlides)
    this.context.router.transitionTo('slide-presentation',
      {id: this.context.router.getCurrentParams().id, index: 1});
  }

  onPresentatorShouldHide() {
    PresentatorActions.presentationEnded()
    this.context.router.transitionTo('presentation-details',
      {id: this.context.router.getCurrentParams().id});
  }

  onPresentatorWillSlide(slide) {
    this.context.router.transitionTo('slide-presentation',
      {id: this.context.router.getCurrentParams().id, index: slide});
  }

  render() {
    const params = this.context.router.getCurrentParams();
    return (
      <div id="presentation-details" className="mw8 center phm phl-ns">
        <h1 className="f1-ns normal">
          React presentation #{params.id}
        </h1>

        <section>
          <h3>About presentation #{params.id}</h3>
          <button
            className="btn btn--gray bg-light-gray phm"
            onClick={this.onBtnShowClick.bind(this)}>show slides</button>
          <p>I know what an erection feels like, Michael. Coo coo ca chaw. Coo coo ca chaw. So, what do you say? We got a basket full of father-son fun here. What's Kama Sutra oil? Maybe it's not for us. Hey, it was one night of wild passion! And yet you did not notice her body? I like to look in the mirror.</p>
        </section>

        <section>
          <h3>Short description</h3>
          <p>
            Ancient alien evidence Annunaki crystal skull SETI astronaut, Indian texts sightings clearly sanskrit vimana evidence, DNA manipulation spaceships space travel pyramids sightings Ezekiel. Ancient god space travel magnetic current foo fighter, the answer is a resounding YES...
          </p>
        </section>

        <section>
          <h3>Misc</h3>
          <p>
            author, info, date, etc
          </p>
        </section>

        <Presentator
          routeParams={params}
          initialSlide={params.index}
          onWillHide={this.onPresentatorShouldHide.bind(this)}
          onWillSlide={this.onPresentatorWillSlide.bind(this)}
          totalSlides={6}>

        </Presentator>
      </div>
    );
  }

}

PresentationDetails.contextTypes = {
  router: React.PropTypes.func
};

export default PresentationDetails;
