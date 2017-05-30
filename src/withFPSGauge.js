import React, { Component } from 'react'
import collectFps from 'collect-fps'

const noop = () => {}

export default ({ threshold = 30, fpsCollector = collectFps }) => Target => {
  let endFPSCollection = noop

  const handleStartFPSCollection = component => () => {
    if (endFPSCollection !== noop || component.state.fps < threshold) {
      return
    }

    try {
      endFPSCollection = fpsCollector()
    } catch (e) {
      endFPSCollection = () => 0
    }
  }

  class WithFPSGauge extends Component {
    constructor() {
      super()

      this.state = { fps: threshold }
    }

    render() {
      return (
        <Target
          {...this.props}
          onStartFPSCollection={handleStartFPSCollection(this)}
          onEndFPSCollection={() => {
            if (endFPSCollection !== noop) {
              const fps = endFPSCollection()
              this.setState({ fps })
              endFPSCollection = noop
              if (fps < threshold) {
                this.props.onLowFPS && this.props.onLowFPS()
              }
            }
          }}
          lowFPS={this.state.fps < threshold}
        />
      )
    }
  }

  WithFPSGauge.displayName = Target.displayName || Target.name

  return WithFPSGauge
}
