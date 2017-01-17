import React, {Component} from 'react'
import collectFps from 'collect-fps'

export default ({
  sampleSize = 20,
  lowFPSPropName = 'lowFPS',
  threshold = 30,
  propsToWatch = [],
  fpsCollector = collectFps
}) => (Target) => {
  const collectFpsForComponent = (component) =>
    fpsCollector(sampleSize, (err, fps) =>
      component.setState({
        fps: err ? 0 : fps
      })
    )

  class MonitorAnimationSpeed extends Component {
    constructor () {
      super()

      this.state = {
        fps: 60
      }
    }

    componentWillReceiveProps (nextProps) {
      const somePropToWatchChanged = propsToWatch
        .reduce(
          (changed, propName) =>
            changed ||
            nextProps[propName] !== this.props[propName],
          false
        )

      if (somePropToWatchChanged) {
        collectFpsForComponent(this)
      }
    }

    componentDidMount () {
      collectFpsForComponent(this)
    }

    componentDidUpdate () {
      this.props.onLowFPS &&
      this.state.fps < threshold &&
      this.props.onLowFPS()
    }

    render () {
      const lowFPSProps = {
        [lowFPSPropName]: this.state.fps < threshold
      }

      return <Target
        {...this.props}
        {...lowFPSProps}
      />
    }
  }

  MonitorAnimationSpeed.displayName = Target.displayName || Target.name

  return MonitorAnimationSpeed
}
