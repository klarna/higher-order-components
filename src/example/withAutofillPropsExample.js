import React from 'react'
import { withAutofillProps } from '../'

export default withAutofillProps({ autofill: true })(function Autofill({ autofill, ...props }) {
  return (
    <article>
      <h1>withAutofillProps</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withAutofillProps } from '@klarna/higher-order-components'

export default withAutofillProps({ autofill: true })(function Autofill({ autofill, ...props }) {
  return (
    <article>
      <h1>withAutofillProps</h1>
      <input placeholder={autofill ? 'autofilled!' : 'not autofilled'} {...props} />
    </article>
  )
})`}</pre>
      </code>
      <input placeholder={autofill ? 'autofilled!' : 'not autofilled'} {...props} />
    </article>
  )
})
