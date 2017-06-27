import React, { Component } from 'react'
import PropTypes from 'prop-types'
import wrapDisplayName from 'recompose/wrapDisplayName'
import jwtDecode from 'jwt-decode'

export default (propName, propsMapping) => Target => {
  class WithJWTProps extends Component {
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
        this.props.onJWTError(e)

        return {}
      }
    }

    render() {
      return <Target {...this.props} {...this.state} />
    }
  }

  WithJWTProps.defaultProps = {
    onJWTError: () => {},
  }

  WithJWTProps.propTypes = {
    onJWTError: PropTypes.func,
  }

  WithJWTProps.displayName = wrapDisplayName(Target, 'withJWTProps')

  return WithJWTProps
}
