import React from 'react'
import { render } from 'react-dom'

import WithDeprecationWarningExample from './WithDeprecationWarningExample'

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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Example>
    </section>
  </main>,
  document.getElementById('root')
)
