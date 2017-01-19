import React, {Component} from 'react'
import collectFps from 'collect-fps'

const noop = () => {}

export default ({
  threshold = 30,
  fpsCollector = collectFps
}) => (Target) => {
  let endFPSCollection = noop

  const handleStartFPSCollection = onStartFPSCollection => () => {
    if (endFPSCollection !== noop) { endFPSCollection() }

    endFPSCollection = fpsCollector()
    onStartFPSCollection && onStartFPSCollection()
  }

  class NotifyOnLowFPS extends Component {
    constructor () {
      super()

      this.state = {fps: threshold}
    }

    render () {
      const {
        onStartFPSCollection,
        onEndFPSCollection,
        onFPSCollected,
        ...props
      } = this.props

      return <Target
        {...props}
        onStartFPSCollection={handleStartFPSCollection(onStartFPSCollection)}
        onEndFPSCollection={() => {
          if (endFPSCollection !== noop) {
            const fps = endFPSCollection()
            this.setState({fps})
            endFPSCollection = noop
            onFPSCollected && onFPSCollected(fps)
          }
          onEndFPSCollection && onEndFPSCollection()
        }}
        lowFPS={this.state.fps < threshold}
      />
    }
  }

  NotifyOnLowFPS.displayName = Target.displayName || Target.name

  return NotifyOnLowFPS
}
