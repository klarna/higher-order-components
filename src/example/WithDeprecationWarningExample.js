import React from 'react'
import { withDeprecationWarning } from '../'

export default withDeprecationWarning({
  readMore: 'http://example.com/why-old-component-is-deprecated',
  useInstead: 'Underlined',
  name: 'DeprecatedComponent',
})(function DeprecatedComponent() {
  return (
    <article>
      <h1>withDeprecationWarning</h1>
      <p>This one will log a deprecation warning in the console</p>
    </article>
  )
})
