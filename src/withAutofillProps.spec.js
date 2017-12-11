import React from 'react'
import { render } from 'react-dom'
import withAutofillProps from './withAutofillProps'
import { equal } from 'assert'

describe('withAutofillProps', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withAutofillProps({ autofill: true })(Input)

    equal(EnhancedInput.displayName, 'withAutofillProps(Input)')
  })

  it('has the autofilled prop when autofill animation gets triggered', () => {
    const root = document.createElement('div')
    let animationStartCallback

    function Target({ autofilled, onAnimationStart }) {
      animationStartCallback = onAnimationStart

      return <div>{autofilled ? 'autofilled' : 'not autofilled'}</div>
    }

    const DecoratedTarget = withAutofillProps({
      autofilled: true,
    })(Target)

    render(<DecoratedTarget />, root)

    equal(root.innerText, 'not autofilled')

    animationStartCallback({ animationName: 'onAutofillStart' })

    equal(root.innerText, 'autofilled')
  })

  it('does not have the autofilled prop when autofill animation gets canceled', () => {
    const root = document.createElement('div')
    let animationStartCallback

    function Target({ autofilled, onAnimationStart }) {
      animationStartCallback = onAnimationStart

      return <div>{autofilled ? 'autofilled' : 'not autofilled'}</div>
    }

    const DecoratedTarget = withAutofillProps({
      autofilled: true,
    })(Target)

    render(<DecoratedTarget />, root)

    animationStartCallback({ animationName: 'onAutofillStart' })
    equal(root.innerText, 'autofilled')

    animationStartCallback({ animationName: 'onAutofillCancel' })

    equal(root.innerText, 'not autofilled')
  })
})
