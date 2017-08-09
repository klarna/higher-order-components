import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default hoverProps => Target => {
  class WithHoverProps extends Component {
    constructor() {
      super()

      this.state = {
        hovered: false,
      }
      this.onMouseOver = this.onMouseOver.bind(this)
      this.onMouseOut = this.onMouseOut.bind(this)
    }

    onMouseOver(...args) {
      this.setState({ hovered: true })

      if (this.props.onMouseOver) {
        this.props.onMouseOver(...args)
      }
    }

    onMouseOut(...args) {
      this.setState({ hovered: false })

      if (this.props.onMouseOut) {
        this.props.onMouseOut(...args)
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          {...this.state.hovered && hoverProps}
        />
      )
    }
  }

  WithHoverProps.displayName = wrapDisplayName(Target, 'withHoverProps')

  return WithHoverProps
}
