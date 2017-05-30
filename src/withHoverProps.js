import React, { Component } from 'react'

export default hoverProps => Target =>
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
