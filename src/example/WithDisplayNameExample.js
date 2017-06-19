import React from 'react'
import { withDisplayName } from '../'

export default withDisplayName('Has')('Long')('Namespaced')(
  'Name'
)(function ComponentToBeWrappedWithADifferentName() {
  return (
    <article>
      <h1>withDisplayName</h1>
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withDisplayName } from '@klarna/higher-order-components'

export default withDisplayName('Has')('Long')('Namespaced')(
  'Name'
)(function ComponentToBeWrappedWithADifferentName() {
  return (
    <article>
      <h1>withDisplayName</h1>
      <p>
        This one will have a long custom name when inspecting it
        with the React DevTools
      </p>
    </article>
  )
})`}</pre>
      </code>
      <p>This one will have a long custom name when inspecting it with the React DevTools</p>
    </article>
  )
})
