import React from 'react'
import { withHoverProps } from '../'

export default withHoverProps({ hovered: true })(function Focusable({ hovered, ...props }) {
  return (
    <article {...props}>
      <h1>withHoverProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withHoverProps } from '@klarna/higher-order-components'

export default withHoverProps({ hovered: true })(function Focusable({ hovered, ...props }) {
  return (
    <article {...props}>
      <h1>withHoverProps</h1>
      {hovered ? 'hovered!' : 'not hovered'}
    </article>
  )
})`}</pre>
      </code>
      {hovered ? 'hovered!' : 'not hovered'}
    </article>
  )
})
