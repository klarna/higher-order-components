import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default touchProps => Target => {
  class WithTouchProps extends Component {
    constructor() {
      super()

      this.state = {
        touched: false,
      }
    }

    render() {
      const { onTouchStart, onTouchEnd, ...props } = this.props
      const { touched } = this.state

      return (
        <Target
          onTouchStart={(...args) => {
            this.setState({ touched: true })
            onTouchStart && onTouchStart(...args)
          }}
          onTouchEnd={(...args) => {
            this.setState({ touched: false })
            onTouchEnd && onTouchEnd(...args)
          }}
          {...props}
          {...(touched ? touchProps : {})}
        />
      )
    }
  }

  WithTouchProps.displayName = wrapDisplayName(Target, 'withTouchProps')

  return WithTouchProps
}
