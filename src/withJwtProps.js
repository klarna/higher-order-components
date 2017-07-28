import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wrapDisplayName from 'recompose/wrapDisplayName'
import jwtDecode from 'jwt-decode'

export default (propName, propsMapping) => Target => {
  class WithJwtProps extends Component {
    constructor(props, context) {
      super(props, context)

      this.state = this.buildState(props[propName])
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps[propName] !== this.props[propName]) {
        this.setState(this.buildState(nextProps[propName]))
      }
    }

    buildState(token) {
      try {
        const decodedToken = jwtDecode(token)

        if (!propsMapping) {
          return decodedToken
        }

        return Object.keys(propsMapping).reduce((result, fromKey) => {
          const toKey = propsMapping[fromKey]
          result[toKey] = decodedToken[fromKey]

          return result
        }, {})
      } catch (e) {
        this.props.onJwtError(e)

        return {}
      }
    }

    render() {
      return <Target {...this.props} {...this.state} />
    }
  }

  WithJwtProps.defaultProps = {
    onJWTError: () => {},
  }

  WithJwtProps.propTypes = {
    onJwtError: PropTypes.func,
  }

  WithJwtProps.displayName = wrapDisplayName(Target, 'withJwtProps')

  return WithJwtProps
}
