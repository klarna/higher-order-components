import React from 'react'
import { render } from 'react-dom'

import WithDeprecationWarningExample from './WithDeprecationWarningExample'
import WithDisplayNameExample from './WithDisplayNameExample'
import WithFocusPropsExample from './WithFocusPropsExample'

const Example = ({ children }) => (
  <div
    style={{
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 20,
      fontFamily: 'sans-serif',
    }}
  >
    {children}
  </div>
)

render(
  <main style={{ padding: 20 }}>
    <h1
      style={{
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      @klarna/higher-order-components examples
    </h1>

    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'calc(50% - 10px) calc(50% - 10px)',
        gridGap: '20px',
      }}
    >
      <Example>
        <WithDeprecationWarningExample />
      </Example>
      <Example>
        <WithDisplayNameExample />
      </Example>
      <Example>
        <WithFocusPropsExample />
      </Example>
    </section>
  </main>,
  document.getElementById('root')
)
