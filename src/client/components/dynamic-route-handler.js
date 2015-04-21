import React from 'react'
import {RouteHandler} from 'react-router'

class DynamicRouteHandler extends React.Component {

  componentWillReceiveProps(props) {
    if (props.routeParams.index !== this.props.routeParams.index)
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
