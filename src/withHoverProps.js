import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default hoverProps => Target => {
  class WithHoverProps extends Component {
    constructor() {
      super()

      this.state = {
        hover: false,
      }
    }

    render() {
      const { onMouseEnter, onMouseLeave, ...props } = this.props
      const { hover } = this.state

      return (
        <Target
          onMouseEnter={(...args) => {
            this.setState({ hover: true })
            onMouseEnter && onMouseEnter(...args)
          }}
          onMouseLeave={(...args) => {
            this.setState({ hover: false })
            onMouseLeave && onMouseLeave(...args)
          }}
          {...props}
          {...(hover ? hoverProps : {})}
        />
      )
    }
  }

  WithHoverProps.displayName = wrapDisplayName(Target, 'withHoverProps')

  return WithHoverProps
}
