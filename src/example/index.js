import React from 'react'
import { render } from 'react-dom'
import componentQueries from 'react-component-queries'

import WithDeprecationWarningExample from './WithDeprecationWarningExample'
import WithDisplayNameExample from './WithDisplayNameExample'
import WithFocusPropsExample from './WithFocusPropsExample'
import WithHoverPropsExample from './WithHoverPropsExample'
import WithMouseDownPropsExample from './WithMouseDownPropsExample'
import WithTouchPropsExample from './WithTouchPropsExample'
import WithUncontrolledPropExample from './WithUncontrolledPropExample'
import WithUniqueFormIdentifierExample from './WithUniqueFormIdentifierExample'

const Example = ({ children }) =>
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

const Page = componentQueries(
  ({ width }) => (width < 800 ? { mobile: true } : { mobile: false })
)(({ mobile }) =>
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
        ...(mobile
          ? { gridTemplateColumns: '100%' }
          : {
              gridTemplateColumns: 'calc(50% - 10px) calc(50% - 10px)',
              gridGap: '20px',
            }),
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
      <Example>
        <WithHoverPropsExample />
      </Example>
      <Example>
        <WithMouseDownPropsExample />
      </Example>
      <Example>
        <WithTouchPropsExample />
      </Example>
      <Example>
        <WithUncontrolledPropExample />
      </Example>
      <Example>
        <WithUniqueFormIdentifierExample />
      </Example>
    </section>
  </main>
)

render(<Page />, document.getElementById('root'))
