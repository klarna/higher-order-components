import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { getContextualizer } from 'react-context-props'
import { equal } from 'assert'
import withOverrideFromContext from './withOverrideFromContext'

describe('withOverrideFromContext', () => {
  it('wraps the name of the original component', () => {
    function Target(props) {
      return <input {...props} />
    }

    const EnhancedTarget = withOverrideFromContext(Target)

    equal(EnhancedTarget.displayName, 'withOverrideFromContext(Target)')
  })

  describe('when overriding props', () => {
    it('should get the props merged from the local and the overrides', () => {
      const root = document.createElement('div')
      document.body.innerHTML = ''
      document.body.appendChild(root)

      function Target({ style, color, primary }) {
        return (
          <div>
            <span id="background">
              {style.background}
            </span>
            <span id="textAlign">
              {style.textAlign}
            </span>
            <span id="color">
              {color}
            </span>
            <span id="primary">
              {primary.toString()}
            </span>
          </div>
        )
      }

      const Overrides = getContextualizer({
        Target: PropTypes.object,
      })

      const OverridableTarget = withOverrideFromContext(Target)

      render(
        <Overrides
          Target={{
            style: { background: 'red', textAlign: 'justify' },
            color: 'blue',
            primary: false,
          }}
        >
          <OverridableTarget style={{ textAlign: 'left' }} primary />
        </Overrides>,
        root
      )

      equal(root.querySelector('#background').innerHTML, 'red')
      equal(root.querySelector('#textAlign').innerHTML, 'left')
      equal(root.querySelector('#color').innerHTML, 'blue')
      equal(root.querySelector('#primary').innerHTML, 'true')
    })
  })

  describe('when overriding the entire component', () => {
    it('renders the replacement component, that gets the props passed to it', () => {
      const root = document.createElement('div')
      document.body.innerHTML = ''
      document.body.appendChild(root)

      function Target({ style, color, primary }) {
        return (
          <div>
            <span id="background">
              {style.background}
            </span>
            <span id="textAlign">
              {style.textAlign}
            </span>
            <span id="color">
              {color}
            </span>
            <span id="primary">
              {primary}
            </span>
          </div>
        )
      }

      function Replacement({ style, primary, color }) {
        return (
          <div>
            <span id="replacementBackground">
              {style.background || 'default'}
            </span>
            <span id="replacementTextAlign">
              {style.textAlign || 'default'}
            </span>
            <span id="replacementColor">
              {color || 'default'}
            </span>
            <span id="replacementPrimary">
              {primary.toString() || 'default'}
            </span>
          </div>
        )
      }

      const Overrides = getContextualizer({
        Target: PropTypes.func,
      })

      const OverridableTarget = withOverrideFromContext(Target)

      render(
        <Overrides Target={Replacement}>
          <OverridableTarget style={{ textAlign: 'left' }} primary />
        </Overrides>,
        root
      )

      equal(root.querySelector('#replacementBackground').innerHTML, 'default')
      equal(root.querySelector('#replacementTextAlign').innerHTML, 'left')
      equal(root.querySelector('#replacementColor').innerHTML, 'default')
      equal(root.querySelector('#replacementPrimary').innerHTML, 'true')
    })
  })

  describe('when there is no override', () => {
    it('renders as usual', () => {
      const root = document.createElement('div')
      document.body.innerHTML = ''
      document.body.appendChild(root)

      function Target({ style, color, primary }) {
        return (
          <div>
            <span id="background">
              {style.background}
            </span>
            <span id="textAlign">
              {style.textAlign}
            </span>
            <span id="color">
              {color}
            </span>
            <span id="primary">
              {primary.toString()}
            </span>
          </div>
        )
      }

      const OverridableTarget = withOverrideFromContext(Target)

      render(<OverridableTarget style={{ textAlign: 'left' }} primary />, root)

      equal(root.querySelector('#background').innerHTML, '')
      equal(root.querySelector('#textAlign').innerHTML, 'left')
      equal(root.querySelector('#color').innerHTML, '')
      equal(root.querySelector('#primary').innerHTML, 'true')
    })
  })
})
