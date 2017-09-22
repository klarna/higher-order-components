import React from 'react'
import { withPressedProps } from '../'

export default withPressedProps({ pressed: true })(function Pressable({ pressed, ...props }) {
  return (
    <article {...props}>
      <h1>withPressedProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withPressedProps } from '@klarna/higher-order-components'

export default withPressedProps({ pressed: true })(function Pressable({ pressed, ...props }) {
  return (
    <article {...props}>
      <h1>withPressedProps</h1>
      {pressed ? 'pressed!' : 'press anywhere to see it change'}
    </article>
  )
})`}</pre>
      </code>
      {pressed ? 'pressed!' : 'press anywhere to see it change'}
    </article>
  )
})
