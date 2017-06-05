import React from 'react'
import { withDisplayName } from '../'

export default withDisplayName('Has')('Long')('Namespaced')(
  'Name'
)(function ComponentToBeWrappedWithADifferentName() {
  return (
    <article>
      <h1>withDisplayName</h1>
      <p>This one will have a long custom name when inspecting it with the React DevTools</p>
    </article>
  )
})
