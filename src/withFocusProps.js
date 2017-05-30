import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default focusProps => Target => {
  class WithFocusProps extends Component {
    constructor() {
      super()

      this.state = {
        focused: false,
      }
    }

    render() {
      const { onFocus, onBlur, ...props } = this.props
      const { focused } = this.state

      return (
        <Target
          onFocus={(...args) => {
            this.setState({ focused: true })
            onFocus && onFocus(...args)
          }}
          onBlur={(...args) => {
            this.setState({ focused: false })
            onBlur && onBlur(...args)
          }}
          {...props}
          {...(focused ? focusProps : {})}
        />
      )
    }
  }

  WithFocusProps.displayName = wrapDisplayName(Target, 'withFocusProps')

  return WithFocusProps
}
