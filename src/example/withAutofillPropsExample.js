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
      <input name="email" style={autofill && { borderColor: 'aqua' }} {...props} />
    </article>
  )
})`}</pre>
      </code>
      <input name="email" style={autofill && { borderColor: 'aqua' }} {...props} />
    </article>
  )
})
