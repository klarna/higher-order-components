import React from 'react'
import { equal } from 'assert'
import withDeprecationWarning from './withDeprecationWarning'

describe('withDeprecationWarning', () => {
  it('wraps the name of the original component', () => {
    function Greeter() {
      return <h1>Hello</h1>
    }

    const EnhancedGreeter = withDeprecationWarning({})(Greeter)

    equal(EnhancedGreeter.displayName, 'withDeprecationWarning(Greeter)')
  })
})
