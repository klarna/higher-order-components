import React, { Component } from 'react'
import { withNotifyOnLowFPS } from '../'

export default withNotifyOnLowFPS({ threshold: 50 })(
  class WithNotifyOnLowFPSExample extends Component {
    constructor() {
      super()

      this.state = { bigPadding: false, currentTopPadding: 0 }
    }

    componentDidUpdate() {
      const { onEndFPSCollection } = this.props
      if (this.state.bigPadding) {
        const height = this.rootElement.getBoundingClientRect().height
        if (height < 2000) {
          setTimeout(() => {
            if (height + 10 >= 2000) {
              onEndFPSCollection && onEndFPSCollection()
            }

            this.setState({
              currentTopPadding: this.state.currentTopPadding + 10,
            })
          })
        }
      } else {
        const height = this.rootElement.getBoundingClientRect().height
        if (height > 0) {
          setTimeout(() => {
            if (height - 10 <= 0) {
              onEndFPSCollection && onEndFPSCollection()
            }

            this.setState({
              currentTopPadding: this.state.currentTopPadding - 10,
            })
          })
        }
      }
    }

    render() {
      const { bigPadding, currentTopPadding } = this.state
      const { lowFPS, onStartFPSCollection } = this.props
      return (
        <article
          ref={domElement => (this.rootElement = domElement)}
          style={{ paddingTop: currentTopPadding }}
        >
          <h1>withNotifyOnLowFPS</h1>
          <code>
            <pre
              style={{
                color: 'lightgreen',
                backgroundColor: 'black',
                padding: 10,
                overflowX: 'scroll',
              }}
            >{`import React, { Component } from 'react'
import { withNotifyOnLowFPS } from '@klarna/higher-order-components'

export default withNotifyOnLowFPS({ threshold: 40 })(
  class WithNotifyOnLowFPSExample extends Component {
    constructor() {
      super()

      this.state = { bigPadding: false, currentTopPadding: 0 }
    }

    componentDidUpdate() {
      const { onEndFPSCollection } = this.props
      if (this.state.bigPadding) {
        const height = this.rootElement.getBoundingClientRect().height
        if (height < 500) {
          setTimeout(() => {
            if (height + 10 >= 500) {
              onEndFPSCollection && onEndFPSCollection()
            }

            this.setState({
              currentTopPadding: this.state.currentTopPadding + 10,
            })
          })
        }
      } else {
        const height = this.rootElement.getBoundingClientRect().height
        if (height > 0) {
          setTimeout(() => {
            if (height - 10 <= 0) {
              onEndFPSCollection && onEndFPSCollection()
            }

            this.setState({
              currentTopPadding: this.state.currentTopPadding - 10,
            })
          })
        }
      }
    }

    render() {
      const { bigPadding, currentTopPadding } = this.state
      const { lowFPS, onStartFPSCollection } = this.props
      return (
        <article
          ref={domElement => (this.rootElement = domElement)}
          style={{ paddingTop: currentTopPadding }}
        >
          <h1>withNotifyOnLowFPS</h1>
          <button
            onClick={() => {
              this.setState({ bigPadding: !bigPadding })
              onStartFPSCollection && onStartFPSCollection()
            }}
          >
            Toggle size
          </button>{' '}
          {lowFPS ? 'Low FPS' : 'High FPS'}
        </article>
      )
    }
  }
)`}</pre>
          </code>
          <button
            onClick={() => {
              this.setState({ bigPadding: !bigPadding })
              onStartFPSCollection && onStartFPSCollection()
            }}
          >
            Toggle size
          </button>{' '}
          {lowFPS ? 'Low FPS' : 'High FPS'}
        </article>
      )
    }
  }
)
