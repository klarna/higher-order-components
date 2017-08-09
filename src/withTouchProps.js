import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default touchProps => Target => {
  class WithTouchProps extends Component {
    constructor() {
      super()

      this.state = {
        touched: false,
      }
      this.onTouchStart = this.onTouchStart.bind(this)
      this.onTouchEnd = this.onTouchEnd.bind(this)
    }

    onTouchStart(...args) {
      this.setState({ touched: true })

      if (this.props.onTouchStart) {
        this.props.onTouchStart(...args)
      }
    }

    onTouchEnd(...args) {
      this.setState({ touched: false })

      if (this.props.onTouchEnd) {
        this.props.onTouchEnd(...args)
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          {...this.state.touched && touchProps}
        />
      )
    }
  }

  WithTouchProps.displayName = wrapDisplayName(Target, 'withTouchProps')

  return WithTouchProps
}
