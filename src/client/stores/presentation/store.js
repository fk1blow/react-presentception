import Reflux from 'reflux'
import PresentationActions from './actions'

export default Reflux.createStore({

  init() {
    this.presentation = {
      slideIndex: 0
    }
    this.listenToMany(PresentationActions)
  },

  getInitialState() {
    return this.presentation
  },

  onPresentationStarted(index = 0) {
    this.presentation.slideIndex = index
    console.log("index:", index)
    this.trigger(this.presentation)
  },

  onPresentationStop() {
    this.presentation.slideIndex = 1
    this.trigger(this.presentation)
  },

  onPresentationNext() {
    this.presentation.slideIndex += 1
    this.trigger(this.presentation)
  },

  onPresentationPrev() {
    this.presentation.slideIndex -= 1
    this.trigger(this.presentation)
  }

})
