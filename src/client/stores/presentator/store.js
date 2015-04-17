import Reflux from 'reflux';
import PresentatorActions from './actions'

export default Reflux.createStore({

  init() {
    this._data = {};
    this.listenTo(PresentatorActions.presentationStarted, this.onPresentationRefresh);
    this.listenTo(PresentatorActions.presentationEnded, this.onPresentationEnded);
    this.listenTo(PresentatorActions.toNextSlide, this.onPresentationRefresh);
    this.listenTo(PresentatorActions.toPrevSlide, this.onPresentationRefresh);
  },

  onPresentationRefresh(presentation) {
    const {slide, startIndex, endIndex} = presentation;
    this._data.active = (slide >= startIndex && slide <= endIndex);
    this._data.slide = slide;
    this._data.atSlideStart = (slide === startIndex);
    this._data.atSlideEnd = (slide === endIndex);
    this.trigger(this._data);
  },

  onPresentationEnded() {
    this._data.active = false;
    this._data.slide = 1;
    this._data.atSlideStart = false;
    this._data.atSlideEnd = false;
    this.trigger(this._data);
  },

  getInitialState() {
    return {
      active: false,
      slide: 1,
      atSlideStart: false,
      atSlideEnd: false
    }
  }

});
