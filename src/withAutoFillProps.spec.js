import React, { Component } from 'react'
import { render } from 'react-dom'
import withAutoFillProps from './withAutoFillProps'
import { equal } from 'assert'

describe('withAutoFillProps', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withAutoFillProps({ autofilled: true })(Input)

    equal(EnhancedInput.displayName, 'withAutoFillProps(Input)')
  })

  it('has the autofilled prop when autofill animation gets triggered', done => {
    const root = document.createElement('div')
    let animationStartCallback
    function Target ({autoFilled, onAnimationStart}) {
      animationStartCallback = onAnimationStart

      return <div>{autoFilled ? 'autofilled' : 'not autofilled'}</div>
    }

    const DecoratedTarget = withAutoFillProps({
      autofilled: true,
    })(Target)

    render(<DecoratedTarget />, root)

    equal(root.innerText, 'not autofilled')

    animationStartCallback('onAutofillStart')

    equal(root.innerText, 'autofilled')
  })

  it('loses the autofilled prop when autofill is removed', done => {
    // const root = document.createElement('div')
    // class Target extends Component {
    //   componentDidMount() {
    //     this.props.onFocus()
    //   }
    //
    //   componentDidUpdate() {
    //     setTimeout(() => {
    //       this.props.onBlur()
    //       setTimeout(() => {
    //         equal(root.querySelector('span').textContent, '')
    //         done()
    //       })
    //     })
    //   }
    //
    //   render() {
    //     const { label } = this.props
    //     return <span>{label}</span>
    //   }
    // }
    //
    // Target.defaultProps = { label: '' }
    // const DecoratedTarget = withAutoFillProps({
    //   label: 'Focused!',
    // })(Target)
    //
    // render(<DecoratedTarget />, root)
  })
})
