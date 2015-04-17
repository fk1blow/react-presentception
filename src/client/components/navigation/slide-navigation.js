'use strict';

const KeyboardMappings = {
  32: 'space',
  39: 'right',
  37: 'left',
  38: 'up',
  40: 'down',
  27: 'esc'
}

const NavigationProxyEvents = {
  'right':  'onNextSlide',
  'left':   'onPrevSlide',
  'space':  'onPauseSlide',
  'up':     'onGoTop',
  'down':   'onGoBottom'
}

class SlideNavigation {

  constructor() {
    this._handler = this._handleKeyboardEvent.bind(this);
  }

  activate() {
    if (!this._handler)
      this._handler = this._handleKeyboardEvent.bind(this);
    if ('undefined' !== typeof window)
      document.addEventListener('keydown', this._handler);
  }

  deactivate() {
    if ('undefined' !== typeof window)
      document.removeEventListener('keydown', this._handler);
    this._handler = null;
  }

  _handleKeyboardEvent(e) {
    if (e.keyCode in KeyboardMappings) {
      this._parseNavigationEvent(KeyboardMappings[e.keyCode]);
    }
  }

  _parseNavigationEvent(event) {
    if (event in NavigationProxyEvents) {
      this._proxyNavigationEvent(NavigationProxyEvents[event]);
    }
  }

  _proxyNavigationEvent(proxyHandler) {
    if (typeof this[proxyHandler] === 'function') {
      this[proxyHandler].call(this);
    }
  }

}

export default SlideNavigation;
