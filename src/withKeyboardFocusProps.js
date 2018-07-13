import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default (focusProps = {}) => Target => {
  let isMousePressed = false

  class WithKeyboardFocusProps extends Component {
    constructor() {
      super()

      this.state = {
        focused: false,
      }
      this.onFocus = this.onFocus.bind(this)
      this.onBlur = this.onBlur.bind(this)
      this.onMouseDown = this.onMouseDown.bind(this)
      this.onMouseUp = this.onMouseUp.bind(this)
    }

    onFocus(...args) {
      if (!isMousePressed) {
        this.setState({ focused: true })
      }

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

    onMouseDown(...args) {
      isMousePressed = true

      if (this.props.onMouseDown) {
        this.props.onMouseDown(...args)
      }
    }

    onMouseUp(...args) {
      isMousePressed = false

      if (this.props.onMouseUp) {
        this.props.onMouseUp(...args)
      }
    }

    render() {
      return (
        <Target
          {...this.props || {}}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          {...(this.state.focused ? focusProps : {})}
        />
      )
    }
  }

  WithKeyboardFocusProps.displayName = wrapDisplayName(Target, 'withKeyboardFocusProps')

  return WithKeyboardFocusProps
}
