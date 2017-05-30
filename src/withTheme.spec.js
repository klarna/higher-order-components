import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { getContextualizer } from 'react-context-props'
import { equal } from 'assert'
import withTheme from './withTheme'

describe('withTheme', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withTheme(() => ({}))(Input)

    equal(EnhancedInput.displayName, 'withTheme(Input)')
  })

  it('gets the prop from context', () => {
    const root = document.createElement('div')
    document.body.innerHTML = ''
    document.body.appendChild(root)

    const Theme = getContextualizer({
      customizations: PropTypes.shape({
        informal: PropTypes.bool,
      }),
    })

    function Salutation({ formality }) {
      return (
        <div id="salutation">
          {formality === 'formal' ? 'Greetings' : 'Hello'}
        </div>
      )
    }

    const ThemeableSalutation = withTheme((customizations, props) => ({
      formality: customizations.informal ? 'informal' : 'formal',
    }))(Salutation)

    render(
      <Theme customizations={{ informal: true }}>
        <div>
          <ThemeableSalutation />
        </div>
      </Theme>,
      root
    )

    equal(root.querySelector('#salutation').textContent.trim(), 'Hello')
  })
})
