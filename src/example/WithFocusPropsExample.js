import React from 'react'
import { withFocusProps } from '../'

export default withFocusProps({ focused: true })(function Focusable({ focused, ...props }) {
  return <article>
    <h1>withFocusProps</h1>
    <input placeholder={focused ? 'focused!' : 'not focused'} {...props} />
  </article>
})
