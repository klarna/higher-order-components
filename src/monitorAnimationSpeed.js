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

      this.state = {fps: 60}
    }

    render () {
      return <Target
        {...this.props}
        onStartFPSCollection={handleStartFPSCollection}
        onEndFPSCollection={() => this.setState({fps: endFPSCollection()})}
        lowFPS={this.state.fps < threshold}
      />
    }
  }

  MonitorAnimationSpeed.displayName = Target.displayName || Target.name

  return MonitorAnimationSpeed
}
