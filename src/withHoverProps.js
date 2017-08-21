import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default hoverProps => Target => {
  class WithHoverProps extends Component {
    constructor() {
      super()

      this.state = {
        hovered: false,
      }
      this.onMouseEnter = this.onMouseEnter.bind(this)
      this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    onMouseEnter(...args) {
      this.setState({ hovered: true })

      if (this.props.onMouseEnter) {
        this.props.onMouseEnter(...args)
      }
    }

    onMouseLeave(...args) {
      this.setState({ hovered: false })

      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(...args)
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          {...this.state.hovered && hoverProps}
        />
      )
    }
  }

  WithHoverProps.displayName = wrapDisplayName(Target, 'withHoverProps')

  return WithHoverProps
}
