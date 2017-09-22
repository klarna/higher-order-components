import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default (focusProps = {}) => Target => {
  class WithFocusProps extends Component {
    constructor() {
      super()

      this.state = {
        focused: false,
      }
      this.onFocus = this.onFocus.bind(this)
      this.onBlur = this.onBlur.bind(this)
    }

    onFocus(...args) {
      this.setState({ focused: true })

      if (this.props.onFocus) {
        this.props.onFocus(...args)
      }
    }

    onBlur(...args) {
      this.setState({ focused: false })

      if (this.props.onBlur) {
        this.props.onBlur(...args)
      }
    }

    render() {
      return (
        <Target
          {...(this.props || {})}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...this.state.focused ? focusProps : {}}
        />
      )
    }
  }

  WithFocusProps.displayName = wrapDisplayName(Target, 'withFocusProps')

  return WithFocusProps
}
