import React, { Component } from 'react'

const initialState = {
  position: {
    startX: '',
    startY: '',
    deltaDistance: 0,
    previousDeltaY: 0,
  },
  time: {
    startTime: null,
  },
}

export default ({ velocityThreshold }) => Target =>
  class App extends Component {
    constructor() {
      super()

      this.state = initialState
    }
    TouchStart(e) {
      this.setState({
        time: {
          ...this.state.time,
          startTime: new Date().getTime(),
        },
        position: {
          ...this.state.position,
          mouseStartX: e.touches[0].clientX,
          mouseStartY: e.touches[0].clientY,
          boxX: e.target.getBoundingClientRect().left,
          boxY: e.target.getBoundingClientRect().top,
          deltaDistance: 0,
        },
      })
    }
    TouchMove(e) {
      e.persist()
      console.log('touchY', e.touches[0].clientY)
      console.log('mouseStartY', this.state.position.mouseStartY)
      console.log('boxY', this.state.position.boxY)
      console.log('deltaY', e.touches[0].clientY - this.state.position.mouseStartY)
      const changeX = e.touches[0].clientX - this.state.position.mouseStartX,
        changeY = e.touches[0].clientY - this.state.position.mouseStartY

      this.setState({
        position: {
          ...this.state.position,
          deltaDistance: e.touches[0].clientY - this.state.position.mouseStartY,
        },
        style: {
          ...this.state.style,
          transform: `translate( ${0}px, ${this.state.position.previousDeltaY + changeY}px)`,
        },
      })
    }
    TouchEnd(e) {
      const deltaTime = new Date().getTime() - this.state.time.startTime
      const velocity = this.state.position.deltaDistance / deltaTime
      this.gestureHandler(velocity)
      console.log('new boxY', this.state.position.boxY + this.state.position.deltaDistance)
      this.setState({
        position: {
          ...this.state.position,
          previousDeltaY: this.state.position.previousDeltaY + this.state.position.deltaDistance,
        },
      })
    }

    gestureHandler(velocity) {
      const THRESHOLD = velocityThreshold

      switch (true) {
        case velocity < -THRESHOLD:
          this.props.onSwipeUp && this.props.onSwipeUp()
          break
        case velocity > THRESHOLD:
          this.props.onSwipeUp && this.props.onSwipeDown()
          break
        default:
          console.log('INVALID_SWIPE')
      }
    }
    render() {
      const { onSwipeUp, onSwipeDown, ...props } = this.props
      return (
        <div
          style={this.state.style}
          onTouchStart={e => this.TouchStart(e)}
          onTouchEnd={e => this.TouchEnd(e)}
          onTouchMove={e => this.TouchMove(e)}
        >
          <Target {...props} />
        </div>
      )
    }
  }
