import React from 'react'
import { withDeprecatedProp } from '../'

export default withDeprecatedProp({
  readMore: 'http://example.com/why-old-prop-is-deprecated',
  useInstead: 'isActive',
  name: 'active',
})(function ComponentThatHasDeprecatedProp() {
  return (
    <article>
      <h1>withDeprecatedProp</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withDeprecatedProp } from '@klarna/higher-order-components'

export default withDeprecatedProp({
  readMore: 'http://example.com/why-old-prop-is-deprecated',
  useInstead: 'isActive',
  name: 'active',
})(function ComponentThatHasDeprecatedProp() {
  return (
    <article>
      <h1>withDeprecatedProp</h1>
      <p>This one will log a deprecation warning in the console</p>
    </article>
  )
})`}</pre>
      </code>
      <p>This one will log a deprecation warning in the console</p>
    </article>
  )
})
