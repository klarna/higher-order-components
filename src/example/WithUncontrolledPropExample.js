import React from 'react'
import { withUncontrolledProp } from '../'

export default withUncontrolledProp({
  prop: 'counter',
  defaultProp: 'defaultCounter',
  handlers: {
    onClick: ({ counter }) => () => (counter || 0) + 1,
  },
})(function StatelessCounter({ counter, onClick }) {
  return (
    <article>
      <h1>withUncontrolledProp</h1>
      <p>
        <button onClick={onClick}>Add one</button>
        Counter: {counter}
      </p>
    </article>
  )
})
