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
    this.listenToMany(PresentatorActions)
  },

  getInitialState() {
    return this.presentator
  },

  onPresentationStarted(presentation) {
    const {id, slide, startIndex, endIndex} = presentation
    this.updatePresentator({
      id, startIndex, endIndex, slide,
      active: (slide >= startIndex && slide <= endIndex),
      atSlideStart: (slide === startIndex),
      atSlideEnd: (slide === endIndex)
    })
  },

  onPresentationEnded() {
    const {id, startIndex, endIndex} = this.presentator
    this.presentator.active = false
    this.updatePresentator({ id, atSlideStart: false, atSlideEnd: false,
      slide: 1, active: false, startIndex, endIndex })
  },

  onNavigateSlide(key) {
    console.log("key:", key)
    const {id, endIndex, slide, startIndex, active} = this.presentator
    var followingIndex = slide

    if (key === 'RIGHT') {
      if (followingIndex < endIndex)
        slide = slide + 1
    }
    else if (key === 'LEFT') {
      if (followingIndex > startIndex)
        slide = slide - 1
    }

    this.updateSlideState({
      id, active, startIndex, endIndex, slide,
      atSlideStart: (followingIndex === startIndex),
      atSlideEnd: (followingIndex === endIndex)
    })
  },

  updatePresentator(slideState) {
    const {id, atSlideStart, atSlideEnd, slide,
      startIndex, endIndex} = slideState
    this.presentator = {id, atSlideStart, atSlideEnd,
      slide, active, startIndex, endIndex}
    this.trigger(this.presentator)
  }

});
