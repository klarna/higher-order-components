import React, { Component } from 'react'
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
})
