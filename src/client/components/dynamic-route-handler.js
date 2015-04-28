import React from 'react'
import {RouteHandler} from 'react-router'

class DynamicRouteHandler extends React.Component {

  componentWillReceiveProps(props) {
    const routeParams = this.props.routeParams
    if (routeParams && routeParams !== this.props.routeParams)
      this.context.router.transitionTo('slide-presentation', props.routeParams)
  }

  render() {
    return (
      <RouteHandler {...this.props} />
    )
  }

}

DynamicRouteHandler.contextTypes = {
  router: React.PropTypes.func
}

export default DynamicRouteHandler
