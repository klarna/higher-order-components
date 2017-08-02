import React, { Component } from 'react'
import { render } from 'react-dom'
import withMouseDownProps from './withMouseDownProps'
import { equal } from 'assert'

describe('withMouseDownProps', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withMouseDownProps({ hover: true })(Input)

    equal(EnhancedInput.displayName, 'withMouseDownProps(Input)')
  })

  it('has the touch down prop when mouseDown gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor() {
        super()

        this.updated = false
      }

      componentDidMount() {
        setTimeout(() => {
          this.updated = true
          this.props.onMouseDown()
        })
      }

      componentDidUpdate() {
        if (this.updated) {
          setTimeout(() => {
            expect(root.querySelector('span').textContent).toBe('Mouse down!')
            done()
          })
        }
      }

      render() {
        const { label } = this.props

        return (
          <div style={{ backgroundColor: 'red', width: 40, height: 20 }}>
            <span>
              {label}
            </span>
          </div>
        )
      }
    }
    Target.defaultProps = { label: '' }
    const DecoratedTarget = withMouseDownProps({
      label: 'Mouse down!',
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('loses the touch down prop when mouseUp gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      componentDidMount() {
        this.props.onMouseDown()
      }

      componentDidUpdate() {
        setTimeout(() => {
          this.props.onMouseUp()
          setTimeout(() => {
            equal(root.querySelector('span').textContent, '')
            done()
          })
        })
      }

      render() {
        const { label } = this.props
        return (
          <span>
            {label}
          </span>
        )
      }
    }

    Target.defaultProps = { label: '' }
    const DecoratedTarget = withMouseDownProps({
      label: 'Mouse down!',
    })(Target)

    render(<DecoratedTarget />, root)
  })
})
