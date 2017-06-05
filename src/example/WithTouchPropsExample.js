import React from 'react'
import { withTouchProps } from '../'

export default withTouchProps({ touched: true })(function Touchable({ touched, ...props }) {
  return (
    <article {...props}>
      <h1>withTouchProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withTouchProps } from '@klarna/higher-order-components'

export default withTouchProps({ touched: true })(function Touchable({ touched, ...props }) {
  return (
    <article {...props}>
      <h1>withTouchProps</h1>
      {touched ? 'touched!' : 'tap anywhere to see it change'}
    </article>
  )
})`}</pre>
      </code>
      {touched ? 'touched!' : 'tap anywhere to see it change'}
    </article>
  )
})
