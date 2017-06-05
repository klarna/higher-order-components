import React from 'react'
import { withFocusProps } from '../'

export default withFocusProps({ focused: true })(function Focusable({ focused, ...props }) {
  return (
    <article>
      <h1>withFocusProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withFocusProps } from '@klarna/higher-order-components'

export default withFocusProps({ focused: true })(function Focusable({ focused, ...props }) {
  return (
    <article>
      <h1>withFocusProps</h1>
      <input placeholder={focused ? 'focused!' : 'not focused'} {...props} />
    </article>
  )
})`}</pre>
      </code>
      <input placeholder={focused ? 'focused!' : 'not focused'} {...props} />
    </article>
  )
})
