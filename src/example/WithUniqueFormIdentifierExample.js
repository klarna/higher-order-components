import React from 'react'
import { withUniqueFormIdentifier } from '../'

export default withUniqueFormIdentifier(function FormElement({ name }) {
  return (
    <article>
      <h1>withUniqueFormIdentifier</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withUniqueFormIdentifier } from '../'

export default withUniqueFormIdentifier(function FormElement({ name }) {
  return (
    <article>
      <h1>withUniqueFormIdentifier</h1>
      <p>The generated unique identifier is:</p>
      <p><code>{name}</code></p>
    </article>
  )
})`}</pre>
      </code>
      <p>The generated unique identifier is:</p>
      <p>
        <code>
          {name}
        </code>
      </p>
    </article>
  )
})
