import React, { Component } from 'react'
import collectFps from 'collect-fps'
import wrapDisplayName from 'recompose/wrapDisplayName'

const noop = () => {}

export default ({ threshold = 30, fpsCollector = collectFps }) => Target => {
  class WithNotifyOnLowFPS extends Component {
    constructor() {
      super()

      this.endFPSCollection = noop
      this.state = {
        fps: threshold,
      }
      this.onStartFPSCollection = this.onStartFPSCollection.bind(this)
      this.onEndFPSCollection = this.onEndFPSCollection.bind(this)
    }

    onStartFPSCollection() {
      if (this.endFPSCollection !== noop || this.state.fps < threshold) {
        return
      }

      try {
        this.endFPSCollection = fpsCollector()
      } catch (e) {
        this.endFPSCollection = () => 0
      }
    }

    onEndFPSCollection() {
      if (this.endFPSCollection !== noop) {
        const fps = this.endFPSCollection()
        this.setState({ fps })
        this.endFPSCollection = noop
        if (fps < threshold) {
          this.props.onLowFPS && this.props.onLowFPS()
        }
      }
    }

    render() {
      return (
        <Target
          {...this.props}
          onStartFPSCollection={this.onStartFPSCollection}
          onEndFPSCollection={this.onEndFPSCollection}
          lowFPS={this.state.fps < threshold}
        />
      )
    }
  }

  WithNotifyOnLowFPS.displayName = wrapDisplayName(Target, 'withNotifyOnLowFPS')

  return WithNotifyOnLowFPS
}
