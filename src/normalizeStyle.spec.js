import React from 'react'
import { render } from 'react-dom'
import { equal } from 'assert'
import normalizeStyle from './normalizeStyle'

let navigatorProduct = ''

navigator.__defineGetter__('product', () => navigatorProduct)

describe('normalizeStyle', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = normalizeStyle(Input)

    equal(EnhancedInput.displayName, 'normalizeStyle(Input)')
  })

  describe('it if receives `px` in lineHeight', () => {
    it('throws an exception asking for the `px` to be removed', () => {
      const root = document.createElement('div')
      const Target = ({ style: { lineHeight } }) =>
        <span>
          {lineHeight}
        </span>

      const EnhancedTarget = normalizeStyle(Target)

      try {
        render(<EnhancedTarget style={{ lineHeight: '20px' }} />, root)
        throw new Error('It should have failed')
      } catch (e) {
        equal(
          e.message,
          'The element `Target` has a `lineHeight` set with a String. Use numbers instead.'
        )
      }
    })
  })

  describe('when in React Native', () => {
    it('leaves the lineHeight as is', () => {
      navigatorProduct = 'ReactNative'

      const root = document.createElement('div')
      const Target = ({ style: { lineHeight } }) =>
        <span>
          {lineHeight}
        </span>

      const EnhancedTarget = normalizeStyle(Target)

      render(<EnhancedTarget style={{ lineHeight: 20 }} />, root)

      equal(root.querySelector('span').textContent, 20)
    })
  })

  describe('when not in React Native', () => {
    it('it sets `px` as the unit of lineHeight', () => {
      navigatorProduct = 'not ReactNative'

      const root = document.createElement('div')
      const Target = ({ style: { lineHeight } }) =>
        <span>
          {lineHeight}
        </span>

      const EnhancedTarget = normalizeStyle(Target)

      render(<EnhancedTarget style={{ lineHeight: 20 }} />, root)

      equal(root.querySelector('span').textContent, '20px')
    })
  })
})
