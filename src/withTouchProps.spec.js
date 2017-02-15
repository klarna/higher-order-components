import React, {Component} from 'react'
import {render} from 'react-dom'
import withTouchProps from './withTouchProps'

describe('withTouchProps', () => {
  it('has the touch down prop when mouseEnter gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor () {
        super()

        this.updated = false
      }

      componentDidMount () {
        setTimeout(() => {
          this.updated = true
          this.props.onTouchStart()
        })
      }

      componentDidUpdate () {
        if (this.updated) {
          setTimeout(() => {
            expect(root.querySelector('span').textContent).toBe('Touched!')
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
    const DecoratedTarget = withTouchProps({
      label: 'Touched!'
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('loses the touch down prop when mouseLeave gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor () {
        super()

        this.updated = false
      }

      componentDidMount () {
        this.props.onTouchStart()
      }

      componentDidUpdate () {
        setTimeout(() => {
          this.props.onTouchEnd()
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
    const DecoratedTarget = withTouchProps({
      label: 'Touched!'
    })(Target)

    render(<DecoratedTarget />, root)
  })
})
