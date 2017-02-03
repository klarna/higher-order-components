import React, {Component} from 'react'
import collectFps from 'collect-fps'

const noop = () => {}

export default ({
  threshold = 30,
  fpsCollector = collectFps
}) => (Target) => {
  let endFPSCollection = noop

  const handleStartFPSCollection = (component) => () => {
    if (endFPSCollection !== noop || component.state.fps < threshold) {
      return
    }

    try {
      endFPSCollection = fpsCollector()
    } catch (e) {
      endFPSCollection = () => 0
    }
  }

  class NotifyOnLowFPS extends Component {
    constructor () {
      super()

      this.state = {fps: threshold}
    }

    render () {
      return <Target
        {...this.props}
        onStartFPSCollection={handleStartFPSCollection(this)}
        onEndFPSCollection={() => {
          if (endFPSCollection !== noop) {
            this.setState({fps: endFPSCollection()})
            endFPSCollection = noop
          }
        }}
        lowFPS={this.state.fps < threshold}
      />
    }
  }

  NotifyOnLowFPS.displayName = Target.displayName || Target.name

  return NotifyOnLowFPS
}
