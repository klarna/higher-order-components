import React, { Component } from 'react'
import { render } from 'react-dom'
import withHoverProps from './withHoverProps'
import { equal } from 'assert'

describe('withHoverProps', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withHoverProps({ hover: true })(Input)

    equal(EnhancedInput.displayName, 'withHoverProps(Input)')
  })

  it('has the hovered prop when mouseEnter gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor() {
        super()

        this.updated = false
      }

      componentDidMount() {
        setTimeout(() => {
          this.updated = true
          this.props.onMouseOver()
        })
      }

      componentDidUpdate() {
        if (this.updated) {
          setTimeout(() => {
            expect(root.querySelector('span').textContent).toBe('Hovered!')
            done()
          })
        }
      }

      render() {
        const { label } = this.props

        return (
          <div style={{ backgroundColor: 'red', width: 40, height: 20 }}>
            <span>{label}</span>
          </div>
        )
      }
    }
    Target.defaultProps = { label: '' }
    const DecoratedTarget = withHoverProps({
      label: 'Hovered!',
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('loses the hovered prop when mouseLeave gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      componentDidMount() {
        this.props.onMouseOver()
      }

      componentDidUpdate() {
        setTimeout(() => {
          this.props.onMouseOut()
          setTimeout(() => {
            equal(root.querySelector('span').textContent, '')
            done()
          })
        })
      }

      render() {
        const { label } = this.props
        return <span>{label}</span>
      }
    }

    Target.defaultProps = { label: '' }
    const DecoratedTarget = withHoverProps({
      label: 'Hovered!',
    })(Target)

    render(<DecoratedTarget />, root)
  })
})
