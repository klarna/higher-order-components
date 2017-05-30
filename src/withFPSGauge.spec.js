import React, { Component } from 'react'
import { render } from 'react-dom'
import { equal } from 'assert'
import withFPSGauge from './withFPSGauge'

const getFPSCollector = result => () => () => result

describe('withFPSGauge', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withFPSGauge({ threshold: 50 })(Input)

    equal(EnhancedInput.displayName, 'withFPSGauge(Input)')
  })

  describe('if the speed is below the specified threshold', () => {
    it('sets the lowFPS prop to true', done => {
      const root = document.createElement('div')
      class Target extends Component {
        componentDidMount() {
          this.collectionComplete = false
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.collectionComplete = true
            this.props.onEndFPSCollection()
          })
        }

        componentDidUpdate() {
          if (this.collectionComplete) {
            equal(this.props.lowFPS, true)
            done()
          }
        }

        render() {
          return <div />
        }
      }
      const fpsCollector = getFPSCollector(20)
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(<DecoratedTarget />, root)
    })

    it('calls the onLowFPS handler', done => {
      const root = document.createElement('div')
      let called = false
      class Target extends Component {
        componentDidMount() {
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.props.onEndFPSCollection()
            expect(called).toBe(true)
            done()
          })
        }

        render() {
          return <div />
        }
      }
      const fpsCollector = getFPSCollector(20)
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(
        <DecoratedTarget
          onLowFPS={() => {
            called = true
          }}
        />,
        root
      )
    })

    it('doesn’t collect again', done => {
      const root = document.createElement('div')
      let callCount = 0
      const fpsCollector = () => {
        callCount = callCount + 1
        return getFPSCollector(20)()
      }
      class Target extends Component {
        componentDidMount() {
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.props.onEndFPSCollection()
            this.props.onStartFPSCollection()
            expect(callCount).toBe(1)
            done()
          })
        }

        render() {
          return <div />
        }
      }
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(<DecoratedTarget />, root)
    })
  })

  describe('if the speed is above or equals to the specified threshold', () => {
    it('sets the lowFPS prop to false', done => {
      const root = document.createElement('div')
      class Target extends Component {
        componentDidMount() {
          this.collectionComplete = false
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.collectionComplete = true
            this.props.onEndFPSCollection()
          })
        }

        componentDidUpdate() {
          if (this.collectionComplete) {
            equal(this.props.lowFPS, false)
            done()
          }
        }

        render() {
          return <div />
        }
      }
      const fpsCollector = getFPSCollector(40)
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(<DecoratedTarget />, root)
    })

    it('does not calls the onLowFPS handler', done => {
      const root = document.createElement('div')
      let called = false
      class Target extends Component {
        componentDidMount() {
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.props.onEndFPSCollection()
            expect(called).toBe(false)
            done()
          })
        }

        render() {
          return <div />
        }
      }
      const fpsCollector = getFPSCollector(40)
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(
        <DecoratedTarget
          onLowFPS={() => {
            called = true
          }}
        />,
        root
      )
    })

    it('collects again', done => {
      const root = document.createElement('div')
      let callCount = 0
      const fpsCollector = () => {
        callCount = callCount + 1
        return getFPSCollector(50)()
      }
      class Target extends Component {
        componentDidMount() {
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.props.onEndFPSCollection()
            this.props.onStartFPSCollection()
            expect(callCount).toBe(2)
            done()
          })
        }

        render() {
          return <div />
        }
      }
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(<DecoratedTarget />, root)
    })
  })

  describe('when we the start it more than once before it is done', () => {
    it('ignores the second call', done => {
      const root = document.createElement('div')
      let callCount = 0
      const fpsCollector = () => {
        callCount = callCount + 1
        return getFPSCollector(20)()
      }

      class Target extends Component {
        componentDidMount() {
          this.props.onStartFPSCollection()
          this.props.onStartFPSCollection()
        }

        render() {
          return <div />
        }
      }

      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(<DecoratedTarget />, root, () => {
        equal(callCount, 1)
        done()
      })
    })
  })

  describe('when collect FPS throws an error', () => {
    it('sets the lowFPS prop to true', done => {
      const root = document.createElement('div')
      class Target extends Component {
        componentDidMount() {
          this.collectionComplete = false
          this.props.onStartFPSCollection()

          setTimeout(() => {
            this.collectionComplete = true
            this.props.onEndFPSCollection()
          })
        }

        componentDidUpdate() {
          if (this.collectionComplete) {
            expect(this.props.lowFPS).toBe(true)
            done()
          }
        }

        render() {
          return <div />
        }
      }
      const fpsCollector = () => {
        throw new Error('something')
      }
      const DecoratedTarget = withFPSGauge({
        threshold: 30,
        fpsCollector,
      })(Target)

      render(<DecoratedTarget />, root)
    })
  })
})
