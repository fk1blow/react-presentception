import React from 'react'

const DefaultKeyMappings = {
  32: 'SPACE',
  39: 'RIGHT',
  37: 'LEFT',
  38: 'UP',
  40: 'DOWN',
  27: 'ESC'
}

class ActionNavigator extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this._handler)
      this._handler = this._handleKeyboardEvent.bind(this)
    if ('undefined' !== typeof window)
      document.addEventListener('keydown', this._handler)
  }

  componentWillUnmount() {
    if ('undefined' !== typeof window)
      document.removeEventListener('keydown', this._handler)
    this._handler = null
  }

  _handleKeyboardEvent(e) {
    if (e.keyCode in DefaultKeyMappings)
      this._proxyNavigationEvent(DefaultKeyMappings[e.keyCode])
  }

  _proxyNavigationEvent(eventType) {
    if (this.props.enable)
      this.props.onKeyNavigation(eventType)
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

ActionNavigator.defaultProps = {
  onKeyNavigation: function() {},
  enable: false
}

export default ActionNavigator
