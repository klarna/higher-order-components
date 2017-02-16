import React, {Component} from 'react'
import {render} from 'react-dom'
import withHoverProps from './withHoverProps'

describe('withHoverProps', () => {
  it('has the hovered prop when mouseEnter gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor () {
        super()

        this.updated = false
      }

      componentDidMount () {
        setTimeout(() => {
          this.updated = true
          this.props.onMouseEnter()
        })
      }

      componentDidUpdate () {
        if (this.updated) {
          setTimeout(() => {
            expect(root.querySelector('span').textContent).toBe('Hovered!')
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
    const DecoratedTarget = withHoverProps({
      label: 'Hovered!'
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('loses the hovered prop when mouseLeave gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor () {
        super()

        this.updated = false
      }

      componentDidMount () {
        this.props.onMouseEnter()
      }

      componentDidUpdate () {
        setTimeout(() => {
          this.props.onMouseLeave()
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
    const DecoratedTarget = withHoverProps({
      label: 'Hovered!'
    })(Target)

    render(<DecoratedTarget />, root)
  })
})
