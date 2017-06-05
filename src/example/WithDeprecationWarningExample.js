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
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withDeprecationWarning } from '@klarna/higher-order-components'

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
})`}</pre>
      </code>
      <p>This one will log a deprecation warning in the console</p>
    </article>
  )
})
