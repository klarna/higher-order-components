import React, { Component } from 'react'

export default ({ velocityThreshold }) => {
  const handleTouchMove = component => e => {
    const { position, style } = component.state

    e.persist()
    const changeX = e.touches[0].clientX - position.mouseStartX,
      changeY = e.touches[0].clientY - position.mouseStartY
    const translateX = position.previousDeltaX + changeX,
      translateY = position.previousDeltaY + changeY

    component.setState({
      position: {
        ...position,
        deltaDistanceX: e.touches[0].clientX - position.mouseStartX,
        deltaDistanceY: e.touches[0].clientY - position.mouseStartY,
      },
      style: {
        ...style,
        transform: `translate( ${translateX}px, ${translateY}px)`,
      },
    })
  }

  const maybeTriggerGestures = ({
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    velocityX,
    velocityY,
  }) => {
    switch (true) {
      case velocityY < -velocityThreshold:
        onSwipeUp && onSwipeUp()
        break
      case velocityY > velocityThreshold:
        onSwipeDown && onSwipeDown()
        break
      case velocityX < -velocityThreshold:
        onSwipeLeft && onSwipeLeft()
        break
      case velocityX > velocityThreshold:
        onSwipeRight && onSwipeRight()
        break
      default:
        console.log('INVALID_SWIPE')
    }
  }

  const initialState = {
    position: {
      startX: '',
      startY: '',
      deltaDistanceX: 0,
      deltaDistanceY: 0,
      previousDeltaX: 0,
      previousDeltaY: 0,
    },
    time: {
      startTime: null,
    },
  }

  const getBoxCoordinates = domElement => {
    const { left, top } = domElement.getBoundingClientRect()

    return {
      boxX: left,
      boxY: top,
    }
  }

  const handleTouchStart = component => e => {
    const { position, time } = component.state

    component.setState({
      time: {
        ...time,
        startTime: new Date().getTime(),
      },
      position: {
        ...position,
        mouseStartX: e.touches[0].clientX,
        mouseStartY: e.touches[0].clientY,
        deltaDistanceX: 0,
        deltaDistanceY: 0,
        ...(position.boxY == null && getBoxCoordinates(e.target)),
      },
    })
  }

  const handleTouchEnd = component => e => {
    const { position, time } = component.state
    const { onSwipeUp, onSwipeRight, onSwipeDown, onSwipeLeft } = component.props
    const deltaTime = new Date().getTime() - time.startTime
    const velocityX = position.deltaDistanceX / deltaTime
    const velocityY = position.deltaDistanceY / deltaTime
    maybeTriggerGestures({
      velocityX,
      velocityY,
      onSwipeUp,
      onSwipeDown,
      onSwipeLeft,
      onSwipeRight,
    })
    console.log('new boxX', position.boxX + position.deltaDistanceX)
    console.log('new boxY', position.boxY + position.deltaDistanceY)
    component.setState({
      position: {
        ...position,
        previousDeltaX: position.previousDeltaX + position.deltaDistanceX,
        previousDeltaY: position.previousDeltaY + position.deltaDistanceY,
      },
    })
  }

  return Target =>
    class App extends Component {
      constructor() {
        super()

        this.state = initialState

        this.handleTouchStart = handleTouchStart(this)
        this.handleTouchMove = handleTouchMove(this)
        this.handleTouchEnd = handleTouchEnd(this)
      }

      render() {
        const { onSwipeUp, onSwipeDown, ...props } = this.props
        return (
          <div
            style={this.state.style}
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
            onTouchMove={this.handleTouchMove}
          >
            <Target {...props} />
          </div>
        )
      }
    }
}
