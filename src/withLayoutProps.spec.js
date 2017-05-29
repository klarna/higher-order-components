import React from 'react'
import PropTypes from 'prop-types'
import {render} from 'react-dom'
import {getContextualizer} from 'react-context-props'
import withLayoutProps from './withLayoutProps'

const LayoutSetter = getContextualizer({layout: PropTypes.string})

describe('withLayoutProps', () => {
  it('sets the props corresponding to the current layout', done => {
    const root = document.createElement('div')
    function Target ({mode}) {
      return <span>{mode}</span>
    }

    const DecoratedTarget = withLayoutProps({
      desktop: {
        mode: 'Desktop!'
      }
    })(Target)

    render(
      <LayoutSetter layout='desktop'>
        <DecoratedTarget />
      </LayoutSetter>,
      root,
      () => {
        expect(root.querySelector('span').textContent).toBe('Desktop!')
        done()
      }
    )
  })
})
