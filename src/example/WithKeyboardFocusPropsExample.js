import React from 'react'
import { withKeyboardFocusProps } from '../'

export default withKeyboardFocusProps({ keyboardFocus: true })(function Focusable({
  keyboardFocus,
  ...props
}) {
  return (
    <article>
      <h1>withKeyboardFocusProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withKeyboardFocusProps } from '@klarna/higher-order-components'

export default withKeyboardFocusProps({ keyboardFocus: true })(function Focusable({ keyboardFocus, ...props }) {
  return (
    <article>
      <h1>withKeyboardFocusProps</h1>
      <input placeholder={keyboardFocus ? 'keyboardFocus!' : 'not keyboardFocus'} {...props} />
    </article>
  )
})`}</pre>
      </code>
      <input placeholder={keyboardFocus ? 'keyboardFocus!' : 'not keyboardFocus'} {...props} />
    </article>
  )
})
