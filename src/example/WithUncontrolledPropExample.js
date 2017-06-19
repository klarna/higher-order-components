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
      <code>
        <pre
          style={{
            color: 'lightgreen',
            backgroundColor: 'black',
            padding: 10,
            overflowX: 'scroll',
          }}
        >{`import React from 'react'
import { withUncontrolledProp } from '@klarna/higher-order-components'

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
})`}</pre>
      </code>
      <p>
        <button onClick={onClick}>Add one</button>
        Counter: {counter}
      </p>
    </article>
  )
})
