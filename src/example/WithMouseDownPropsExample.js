import React from 'react'
import { withMouseDownProps } from '../'

export default withMouseDownProps({ pressed: true })(function Pressable({ pressed, ...props }) {
  return (
    <article {...props}>
      <h1>withMouseDownProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withMouseDownProps } from '@klarna/higher-order-components'

export default withMouseDownProps({ pressed: true })(function Pressable({ pressed, ...props }) {
  return (
    <article {...props}>
      <h1>withMouseDownProps</h1>
      {pressed ? 'pressed!' : 'press anywhere to see it change'}
    </article>
  )
})`}</pre>
      </code>
      {pressed ? 'pressed!' : 'press anywhere to see it change'}
    </article>
  )
})
