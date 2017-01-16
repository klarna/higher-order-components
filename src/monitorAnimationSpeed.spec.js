import React, {Component} from 'react'
import {render} from 'react-dom'
import {equal} from 'assert'
import monitorAnimationSpeed from './monitorAnimationSpeed'

const getFPSCollector = (result, inspector) => {
  let callCounter = 0
  return (sampleSize, callback) => {
    callCounter = callCounter + 1
    setTimeout(() => callback(...result))
    inspector(sampleSize, callCounter, callback)
  }
}

describe('monitorAnimationSpeed', () => {
  describe('collects on componentDidMount', () => {
    describe('if the speed is below the specified threshold', () => {
      it('sets the lowFPS prop to true', (done) => {
        const root = document.createElement('div')
        let callCounter = 0
        class Target extends Component {
          componentDidUpdate () {
            callCounter = callCounter + 1

            if (callCounter === 1) {
              equal(this.props.disableAnimation, true)
              done()
            }
          }

          render () {
            return <div />
          }
        }
        const framesInspector = (sampleSize) => equal(sampleSize, 20)
        const fpsCollector = getFPSCollector([undefined, 20], framesInspector)
        const MonitoredTarget = monitorAnimationSpeed({
          sampleSize: 20,
          lowFPSPropName: 'disableAnimation',
          threshold: 30,
          fpsCollector
        })(Target)

        render(<MonitoredTarget />, root)
      })

      it('calls the onLowFPS callback', (done) => {
        const root = document.createElement('div')
        class Target extends Component {
          render () {
            return <div />
          }
        }
        const framesInspector = (sampleSize) => equal(sampleSize, 20)
        const fpsCollector = getFPSCollector([undefined, 20], framesInspector)
        const MonitoredTarget = monitorAnimationSpeed({
          sampleSize: 20,
          lowFPSPropName: 'disableAnimation',
          threshold: 30,
          fpsCollector
        })(Target)

        render(<MonitoredTarget onLowFPS={done} />, root)
      })
    })

    describe('if the speed is above the specified threshold', () => {
      it('sets the lowFPS prop to false', (done) => {
        const root = document.createElement('div')
        let callCounter = 0
        class Target extends Component {
          componentDidUpdate () {
            callCounter = callCounter + 1

            if (callCounter === 1) {
              equal(this.props.disableAnimation, false)
              done()
            }
          }

          render () {
            return <div />
          }
        }
        const framesInspector = (sampleSize) => equal(sampleSize, 20)
        const fpsCollector = getFPSCollector([undefined, 60], framesInspector)
        const MonitoredTarget = monitorAnimationSpeed({
          sampleSize: 20,
          lowFPSPropName: 'disableAnimation',
          threshold: 30,
          fpsCollector
        })(Target)

        render(<MonitoredTarget />, root)
      })

      it('doesn’t call the onLowFPS callback', (done) => {
        const root = document.createElement('div')
        class Target extends Component {
          render () {
            return <div />
          }
        }
        const framesInspector = (sampleSize) => equal(sampleSize, 20)
        const fpsCollector = getFPSCollector([undefined, 60], framesInspector)
        const MonitoredTarget = monitorAnimationSpeed({
          sampleSize: 20,
          lowFPSPropName: 'disableAnimation',
          threshold: 30,
          fpsCollector
        })(Target)

        let called = false

        render(<MonitoredTarget onLowFPS={() => called = true} />, root)

        setTimeout(() => {
          expect(called).toBe(false)
          done()
        })
      })
    })
  })

  describe('collects on prop change', () => {
    describe('if the speed is below the specified threshold', () => {
      it('sets the lowFPS prop to true', (done) => {
        const root = document.createElement('div')
        let callCounter = 0
        class Target extends Component {
          componentDidUpdate () {
            callCounter = callCounter + 1
            if (callCounter === 3 && this.props.disableAnimation) {
              done()
            }
          }

          render () {
            return <div />
          }
        }

        const framesInspector = (sampleSize) => equal(sampleSize, 20)
        const fpsCollector = getFPSCollector([undefined, 20], framesInspector)
        const MonitoredTarget = monitorAnimationSpeed({
          sampleSize: 20,
          lowFPSPropName: 'disableAnimation',
          threshold: 30,
          propsToWatch: ['value'],
          fpsCollector
        })(Target)

        render(<MonitoredTarget value='value' />, root)
        render(<MonitoredTarget />, root)
      })

      it('calls the onLowFPS callback', (done) => {})
    })

    describe('if the speed is above the specified threshold', () => {
      it('sets the lowFPS prop to false', (done) => {
        const root = document.createElement('div')
        let callCounter = 0
        class Target extends Component {
          componentDidUpdate () {
            callCounter = callCounter + 1
            if (callCounter === 3 && this.props.disableAnimation === false) {
              done()
            }
          }

          render () {
            return <div />
          }
        }

        const framesInspector = (sampleSize) => equal(sampleSize, 20)
        const fpsCollector = getFPSCollector([undefined, 60], framesInspector)
        const MonitoredTarget = monitorAnimationSpeed({
          sampleSize: 20,
          lowFPSPropName: 'disableAnimation',
          threshold: 30,
          propsToWatch: ['value'],
          fpsCollector
        })(Target)

        render(<MonitoredTarget value='value' />, root)
        render(<MonitoredTarget />, root)
      })

      it('doesn’t call the onLowFPS callback', (done) => {})
    })
  })

  it('should do something with the error')
})
