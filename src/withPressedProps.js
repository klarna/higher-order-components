import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default pressedProps => Target => {
  class WithPressedProps extends Component {
    constructor() {
      super()

      this.state = {
        pressed: false,
      }
      this.onMouseDown = this.onMouseDown.bind(this)
      this.onMouseUp = this.onMouseUp.bind(this)
    }

    onMouseDown(...args) {
      this.setState({ pressed: true })

      if (this.props.onMouseDown) {
        this.props.onMouseDown(...args)
      }
    }

    onMouseUp(...args) {
      this.setState({ pressed: false })

      if (this.props.onMouseUp) {
        this.props.onMouseUp(...args)
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          {...this.state.pressed && pressedProps}
        />
      )
    }
  }

  WithPressedProps.displayName = wrapDisplayName(Target, 'withPressedProps')

  return WithPressedProps
}
