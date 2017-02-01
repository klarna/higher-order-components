import React, {PropTypes} from 'react'
import {render} from 'react-dom'
import {getContextualizer} from 'react-context-props'
import {equal} from 'assert'
import themeable from './themeable'

describe('themeable', () => {
  it('gets the prop from context', () => {
    const root = document.createElement('div')
    document.body.innerHTML = ''
    document.body.appendChild(root)

    const Theme = getContextualizer({
      customizations: PropTypes.shape({
        informal: PropTypes.bool
      })
    })

    function Salutation ({ formality }) {
      return <div id='salutation'>
        {formality === 'formal' ? 'Greetings' : 'Hello'}
      </div>
    }

    const ThemeableSalutation = themeable((customizations, props) => ({
      formality: customizations.informal ? 'informal' : 'formal'
    }))(Salutation)

    render(
      <Theme customizations={{informal: true}}>
        <div>
          <ThemeableSalutation />
        </div>
      </Theme>,
      root
    )

    equal(
      root.querySelector('#salutation').textContent.trim(),
      'Hello'
    )
  })
})
