import React from 'react'
import { equal } from 'assert'
import withDeprecatedProp from './withDeprecatedProp'

describe('withDeprecatedProp', () => {
  it('wraps the name of the original component', () => {
    function Greeter() {
      return <h1>Hello</h1>
    }

    const EnhancedGreeter = withDeprecatedProp({})(Greeter)

    equal(EnhancedGreeter.displayName, 'withDeprecatedProp(Greeter)')
  })
})
