import React from 'react'

const DefaultKeyMappings = {
  32: 'space',
  39: 'right',
  37: 'left',
  38: 'up',
  40: 'down',
  27: 'esc'
}

class ActionNavigator extends React.Component {

  constructor(props) {
    super(props)
    this._handler = this._handleKeyboardEvent.bind(this)
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
