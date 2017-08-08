import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default mouseDownProps => Target => {
  class WithMouseDownProps extends Component {
    constructor() {
      super()

      this.state = {
        mouseDown: false,
      }
      this.onMouseDown = this.onMouseDown.bind(this)
      this.onMouseUp = this.onMouseUp.bind(this)
    }

    onMouseDown(...args) {
      this.setState({ mouseDown: true })

      if (this.props.onMouseDown) {
        this.props.onMouseDown(...args)
      }
    }

    onMouseUp(...args) {
      this.setState({ mouseDown: false })

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
          {...this.state.mouseDown && mouseDownProps}
        />
      )
    }
  }

  WithMouseDownProps.displayName = wrapDisplayName(Target, 'withMouseDownProps')

  return WithMouseDownProps
}
