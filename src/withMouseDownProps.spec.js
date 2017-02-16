import React, {Component} from 'react'
import {render} from 'react-dom'
import withMouseDownProps from './withMouseDownProps'

describe('withMouseDownProps', () => {
  it('has the touch down prop when mouseDown gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor () {
        super()

        this.updated = false
      }

      componentDidMount () {
        setTimeout(() => {
          this.updated = true
          this.props.onMouseDown()
        })
      }

      componentDidUpdate () {
        if (this.updated) {
          setTimeout(() => {
            expect(root.querySelector('span').textContent).toBe('Mouse down!')
            done()
          })
        }
      }

      render () {
        const {label} = this.props

        return <div style={{backgroundColor: 'red', width: 40, height: 20}}>
          <span>{label}</span>
        </div>
      }
    }
    Target.defaultProps = { label: '' }
    const DecoratedTarget = withMouseDownProps({
      label: 'Mouse down!'
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('loses the touch down prop when mouseUp gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor () {
        super()

        this.updated = false
      }

      componentDidMount () {
        this.props.onMouseDown()
      }

      componentDidUpdate () {
        setTimeout(() => {
          this.props.onMouseUp()
          this.updated = true
        })

        if (this.updated) {
          expect(root.querySelector('span').textContent).toBe('')
          done()
        }
      }

      render () {
        const {label} = this.props
        return <span>{label}</span>
      }
    }

    Target.defaultProps = { label: '' }
    const DecoratedTarget = withMouseDownProps({
      label: 'Mouse down!'
    })(Target)

    render(<DecoratedTarget />, root)
  })
})
