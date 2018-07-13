import React, { Component } from 'react'
import { render } from 'react-dom'
import withKeyboardFocusProps from './withKeyboardFocusProps'
import { equal } from 'assert'

describe('withKeyboardFocusProps', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withKeyboardFocusProps({ focus: true })(Input)

    equal(EnhancedInput.displayName, 'withKeyboardFocusProps(Input)')
  })

  it('has the keyboardFocus prop when keyboardFocus gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      constructor() {
        super()

        this.updated = false
      }

      componentDidMount() {
        setTimeout(() => {
          this.updated = true
          this.props.onFocus()
        })
      }

      componentDidUpdate() {
        if (this.updated) {
          setTimeout(() => {
            expect(root.querySelector('span').textContent).toBe('Focused!')
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
    const DecoratedTarget = withKeyboardFocusProps({
      label: 'Focused!',
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('loses the keyboardFocus prop when blur gets triggered', done => {
    const root = document.createElement('div')
    class Target extends Component {
      componentDidMount() {
        this.props.onFocus()
      }

      componentDidUpdate() {
        setTimeout(() => {
          this.props.onBlur()
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
    const DecoratedTarget = withKeyboardFocusProps({
      label: 'Focused!',
    })(Target)

    render(<DecoratedTarget />, root)
  })

  it('does not have the keyboardFocus prop when onFocus gets triggered after onMouseDown', done => {
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
          this.props.onFocus()
          setTimeout(() => {
            equal(root.querySelector('span').textContent, '')
            done()
          })
        })
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
    const DecoratedTarget = withKeyboardFocusProps({
      label: 'Focused!',
    })(Target)

    render(<DecoratedTarget />, root)
  })
})
