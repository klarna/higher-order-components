import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default (pressedProps = {}) => Target => {
  class WithPressedProps extends Component {
    constructor() {
      super()

      this.state = {
        pressed: false,
      }
      this.onPressIn = this.onPressIn.bind(this)
      this.onPressOut = this.onPressOut.bind(this)
    }

    onPressIn(...args) {
      this.setState({ pressed: true })

      if (this.props.onPressIn) {
        this.props.onPressIn(...args)
      }
    }

    onPressOut(...args) {
      this.setState({ pressed: false })

      if (this.props.onPressOut) {
        this.props.onPressOut(...args)
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
          {...(this.state.pressed ? pressedProps : {})}
        />
      )
    }
  }

  WithPressedProps.displayName = wrapDisplayName(Target, 'withPressedProps')

  return WithPressedProps
}
