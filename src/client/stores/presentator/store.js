import Reflux from 'reflux';
import PresentatorActions from './actions'

export default Reflux.createStore({

  init() {
    this.presentator = {
      active: false,
      slide: 0,
      atSlideStart: false,
      atSlideEnd: false,
      endIndex: 1
    }
    this.listenToMany(PresentatorActions)
  },

  getInitialState() {
    return this.presentator
  },

  onPresentationStarted(slide, totalSlides) {
    const endIndex = totalSlides
    this.updatePresentator({
      slide: parseInt(slide),
      endIndex,
      active: (slide >= 1 && slide <= endIndex),
      atSlideStart: (slide === 1),
      atSlideEnd: (slide === endIndex)
    })
  },

  onPresentationEnded() {
    const {endIndex} = this.presentator
    this.presentator.active = false
    this.updatePresentator({ atSlideStart: false, atSlideEnd: false,
      slide: 0, active: false, endIndex })
  },

  onNavigateSlide(key) {
    const {endIndex, slide, active} = this.presentator
    var followingIndex = slide

    if (key === 'RIGHT') {
      if (followingIndex < endIndex)
        followingIndex = slide + 1
    }
    else if (key === 'LEFT') {
      if (followingIndex > 1)
        followingIndex = slide - 1
    }

    if (followingIndex != slide)
      PresentatorActions.didUpdateSlide(followingIndex)

    this.updatePresentator({
      slide: followingIndex,
      atSlideStart: (followingIndex === 1),
      atSlideEnd: (followingIndex === endIndex),
      active, endIndex
    })
  },

  didNavigateToSlide(slideNavigated) {
    const {atSlideStart, atSlideEnd,
    endIndex, active} = this.presentator
    this.updatePresentator({
      slide: slideNavigated,
      endIndex, active,
      atSlideStart: (slideNavigated === 1),
      atSlideEnd: (slideNavigated === endIndex)
    })
  },

  updatePresentator(slideState) {
    const {atSlideStart, atSlideEnd, slide,
     endIndex, active} = slideState
    this.presentator = {atSlideStart, atSlideEnd,
      slide, active, endIndex}
    this.trigger(this.presentator)
  }

});
