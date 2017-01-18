import React, {Component} from 'react'
import {render} from 'react-dom'
import {equal} from 'assert'
import notifyOnLowFPS from './notifyOnLowFPS'

const getFPSCollector = (result) => () => () => result

describe('notifyOnLowFPS', () => {
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
      const DecoratedTarget = notifyOnLowFPS({
        threshold: 30,
        fpsCollector
      })(Target)

      render(<DecoratedTarget />, root)
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
      const DecoratedTarget = notifyOnLowFPS({
        threshold: 30,
        fpsCollector
      })(Target)

      render(<DecoratedTarget />, root)
    })
  })
})
