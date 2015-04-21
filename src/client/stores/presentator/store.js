import Reflux from 'reflux';
import PresentatorActions from './actions'

export default Reflux.createStore({

  init() {
    this.presentator = {
      id: 0,
      active: false,
      slide: 1,
      atSlideStart: false,
      atSlideEnd: false,
      startIndex: 1,
      endIndex: 1
    }
    this.listenTo(PresentatorActions.presentationStarted, this.onPresentationStarted)
    this.listenTo(PresentatorActions.presentationEnded, this.onPresentationEnded)
    this.listenTo(PresentatorActions.navigateSlide, this.onNavigateSlide)
  },

  getInitialState() {
    return this.presentator
  },

  onPresentationStarted(presentation) {
    const {id, slide, startIndex, endIndex} = presentation
    this.presentator.id = id
    this.presentator.startIndex = presentation.startIndex
    this.presentator.endIndex = presentation.endIndex
    this.presentator.active = (slide >= startIndex && slide <= endIndex)
    this.presentator.slide = slide
    this.presentator.atSlideStart = (slide === startIndex)
    this.presentator.atSlideEnd = (slide === endIndex)
    this.trigger(this.presentator)
  },

  onPresentationEnded() {
    this.presentator.active = false
    this.presentator.slide = 1
    this.presentator.atSlideStart = false
    this.presentator.atSlideEnd = false
    this.trigger(this.presentator)
  },

  onNavigateSlide(key) {
    const {id, slide, endIndex, startIndex} = this.presentator
    var followingIndex = slide

    if (key === 'right') {
      if (followingIndex < endIndex)
        followingIndex = slide + 1
    }
    else if (key === 'left') {
      if (followingIndex > startIndex)
        followingIndex = slide - 1
    }

    this.presentator.slide = followingIndex
    this.trigger(this.presentator)
  }

});
