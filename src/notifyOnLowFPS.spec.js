import React, {Component} from 'react'
import {render} from 'react-dom'
import {equal} from 'assert'
import monitorAnimationSpeed from './monitorAnimationSpeed'

const getFPSCollector = (result) => () => () => result

describe('monitorAnimationSpeed', () => {
  describe('if the speed is below the specified threshold', () => {
    it('sets the lowFPS prop to true', done => {
      const root = document.createElement('div')
      class Target extends Component {
        componentDidMount () {
          this.collectionComplete = false
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.collectionComplete = true
            this.props.onEndFPSCollection()
          })
        }

        componentDidUpdate () {
          if (this.collectionComplete) {
            equal(this.props.lowFPS, true)
            done()
          }
        }

        render () {
          return <div />
        }
      }
      const fpsCollector = getFPSCollector(20)
      const MonitoredTarget = monitorAnimationSpeed({
        threshold: 30,
        fpsCollector
      })(Target)

      render(<MonitoredTarget />, root)
    })
  })

  describe('if the speed is above or equals to the specified threshold', () => {
    it('sets the lowFPS prop to false', done => {
      const root = document.createElement('div')
      class Target extends Component {
        componentDidMount () {
          this.collectionComplete = false
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.collectionComplete = true
            this.props.onEndFPSCollection()
          })
        }

        componentDidUpdate () {
          if (this.collectionComplete) {
            equal(this.props.lowFPS, false)
            done()
          }
        }

        render () {
          return <div />
        }
      }
      const fpsCollector = getFPSCollector(40)
      const MonitoredTarget = monitorAnimationSpeed({
        threshold: 30,
        fpsCollector
      })(Target)

      render(<MonitoredTarget />, root)
    })
  })
})
