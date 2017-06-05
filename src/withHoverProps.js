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
      const { onMouseOver, onMouseOut, ...props } = this.props
      const { hover } = this.state

      return (
        <Target
          onMouseOver={(...args) => {
            this.setState({ hover: true })
            onMouseOver && onMouseOver(...args)
          }}
          onMouseOut={(...args) => {
            this.setState({ hover: false })
            onMouseOut && onMouseOut(...args)
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
