import React, {Component} from 'react'
import collectFps from 'collect-fps'

const noop = () => {}

export default ({
  threshold = 30,
  fpsCollector = collectFps
}) => (Target) => {
  let endFPSCollection = noop

  const handleStartFPSCollection = (component) => {
    if (endFPSCollection !== noop) { endFPSCollection() }

    endFPSCollection = fpsCollector()
  }

  class MonitorAnimationSpeed extends Component {
    constructor () {
      super()

      this.state = {fps: threshold}
    }

    render () {
      return <Target
        {...this.props}
        onStartFPSCollection={handleStartFPSCollection}
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

  MonitorAnimationSpeed.displayName = Target.displayName || Target.name

  return MonitorAnimationSpeed
}
