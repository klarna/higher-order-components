import React from 'react'
import { render } from 'react-dom'
import { equal } from 'assert'
import withStyleSheetOverride from './withStyleSheetOverride'

describe('withStyleSheetOverride', () => {
  it('wraps the name of the original component', () => {
    function Input(props) {
      return <input {...props} />
    }

    const EnhancedInput = withStyleSheetOverride([], () => ({}))(Input)

    equal(EnhancedInput.displayName, 'withStyleSheetOverride(Input)')
  })

  it('passes the default styleSheet as prop to the component', () => {
    const root = document.createElement('div')
    function Target({ styleSheet }) {
      return (
        <div>
          {styleSheet.base.color}
        </div>
      )
    }

    const Enhanced = withStyleSheetOverride(() => ({
      base: {
        color: 'red',
      },
    }))(Target)

    render(<Enhanced />, root)

    equal(root.querySelector('div').innerText, 'red')
  })

  describe('when some props are picked to be used', () => {
    it('has a styleSheet built using the props passed in', () => {
      const root = document.createElement('div')
      function Target({ styleSheet }) {
        return (
          <div>
            {styleSheet.base.color}
          </div>
        )
      }

      const Enhanced = withStyleSheetOverride(({ hovered, pressed }) => ({
        base: {
          color: hovered && pressed ? 'green' : 'red',
        },
      }))(Target)

      render(<Enhanced hovered pressed />, root)

      equal(root.querySelector('div').innerText, 'green')
    })
  })

  describe('when a styleSheet function override is passed from outside', () => {
    it('the styleSheet is a deepmerge of both results', () => {
      const root = document.createElement('div')

      function Target({ styleSheet }) {
        return (
          <div>
            <h1>
              {styleSheet.base.color}
            </h1>
            <p>
              {styleSheet.base.background}
            </p>
          </div>
        )
      }

      const Enhanced = withStyleSheetOverride(({ hovered, pressed }) => ({
        base: {
          color: hovered && pressed ? 'green' : 'red',
          background: 'blue',
        },
      }))(Target)

      render(
        <Enhanced
          hovered
          pressed
          getStyleSheet={({ hovered, pressed }) => ({
            base: {
              background: hovered && pressed ? 'rebeccapurple' : 'bisque',
            },
          })}
        />,
        root
      )

      equal(root.querySelector('h1').innerText, 'green')
      equal(root.querySelector('p').innerText, 'rebeccapurple')
    })

    describe('when the default styles include a function', () => {
      it('the styleSheet is a deepmerge of both results', () => {
        const root = document.createElement('div')

        function Target({ styleSheet }) {
          return (
            <div>
              <h1>
                {styleSheet.base().color}
              </h1>
              <p>
                {styleSheet.base().background}
              </p>
            </div>
          )
        }

        const Enhanced = withStyleSheetOverride(({ hovered, pressed }) => ({
          base: () => ({
            color: hovered && pressed ? 'green' : 'red',
            background: 'blue',
          }),
        }))(Target)

        render(
          <Enhanced
            hovered
            pressed
            getStyleSheet={({ hovered, pressed }) => ({
              base: {
                background: hovered && pressed ? 'rebeccapurple' : 'bisque',
              },
            })}
          />,
          root
        )

        equal(root.querySelector('h1').innerText, 'green')
        equal(root.querySelector('p').innerText, 'rebeccapurple')
      })
    })
  })
})
