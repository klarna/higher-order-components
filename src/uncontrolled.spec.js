import React from 'react'
import { render } from 'react-dom'
import { equal } from 'assert'
import uncontrolled from './uncontrolled'

describe('uncontrolled', () => {
  it('makes the prop uncontrolled when undefined', done => {
    const root = document.createElement('div')
    document.body.innerHTML = ''
    document.body.appendChild(root)

    function ButtonSwitch1({ pressed, onClick }) {
      return (
        <div>
          <button onClick={onClick}>press</button>
          <span>{pressed ? 'pressed' : 'not pressed'}</span>
        </div>
      )
    }

    const UncontrolledButtonSwitch = uncontrolled({
      prop: 'pressed',
      defaultProp: 'autoPressed',
      handlers: {
        onClick: () => () => true,
      },
    })(ButtonSwitch1)

    render(<UncontrolledButtonSwitch />, root)

    root.querySelector('button').click()

    setTimeout(() => {
      expect(root.querySelector('span').textContent).toBe('pressed')
      done()
    })
  })

  it('makes the prop controlled with defined', () => {
    const root = document.createElement('div')
    document.body.innerHTML = ''
    document.body.appendChild(root)

    function ButtonSwitch({ pressed, onClick }) {
      return (
        <div>
          <button onClick={onClick}>press</button>
          <span>{pressed ? 'pressed' : 'not pressed'}</span>
        </div>
      )
    }

    const UncontrolledButtonSwitch = uncontrolled({
      prop: 'pressed',
      defaultProp: 'autoPressed',
      handlers: {
        onClick: () => () => true,
      },
    })(ButtonSwitch)

    render(<UncontrolledButtonSwitch pressed={false} />, root)

    root.querySelector('button').click()

    equal(root.querySelector('span').textContent, 'not pressed')
  })

  it('makes the prop uncontrolled with default value when default prop is provided', () => {
    const root = document.createElement('div')
    document.body.innerHTML = ''
    document.body.appendChild(root)

    function ButtonSwitch({ pressed, onClick }) {
      return (
        <div>
          <button onClick={onClick}>press</button>
          <span>{pressed ? 'pressed' : 'not pressed'}</span>
        </div>
      )
    }

    const UncontrolledButtonSwitch = uncontrolled({
      prop: 'pressed',
      defaultProp: 'autoPressed',
      handlers: {
        onClick: () => () => true,
      },
    })(ButtonSwitch)

    render(<UncontrolledButtonSwitch autoPressed={false} />, root)

    root.querySelector('button').click()

    equal(root.querySelector('span').textContent, 'pressed')
  })

  it('uses the defaultProp to set the initial value', () => {
    const root = document.createElement('div')
    document.body.innerHTML = ''
    document.body.appendChild(root)

    function ButtonSwitch({ pressed, onClick }) {
      return (
        <div>
          <button onClick={onClick}>press</button>
          <span>{pressed ? 'pressed' : 'not pressed'}</span>
        </div>
      )
    }

    const UncontrolledButtonSwitch = uncontrolled({
      prop: 'pressed',
      defaultProp: 'autoPressed',
      handlers: {
        onClick: () => () => true,
      },
    })(ButtonSwitch)

    render(<UncontrolledButtonSwitch autoPressed />, root)

    equal(root.querySelector('span').textContent, 'pressed')
  })

  describe('using the old props', () => {
    it('updates the value when uncontrolled', () => {
      const root = document.createElement('div')
      document.body.innerHTML = ''
      document.body.appendChild(root)

      function ButtonSwitch({ pressed, onClick }) {
        return (
          <div>
            <button onClick={onClick}>toggle</button>
            <span>{pressed ? 'pressed' : 'not pressed'}</span>
          </div>
        )
      }

      const UncontrolledButtonSwitch = uncontrolled({
        prop: 'pressed',
        defaultProp: 'autoPressed',
        handlers: {
          onClick: ({ pressed }) => () => !pressed,
        },
      })(ButtonSwitch)

      render(<UncontrolledButtonSwitch />, root)

      root.querySelector('button').click()

      equal(root.querySelector('span').textContent, 'pressed')

      root.querySelector('button').click()

      equal(root.querySelector('span').textContent, 'not pressed')
    })
  })

  describe('using the original event data', () => {
    it('makes the prop uncontrolled when undefined', () => {
      const root = document.createElement('div')
      document.body.innerHTML = ''
      document.body.appendChild(root)

      function ButtonSwitch({ pressed, onClick }) {
        return (
          <div>
            <button id="press" onClick={() => onClick(true)}>press</button>
            <button id="unpress" onClick={() => onClick(false)}>unpress</button>
            <span>{pressed ? 'pressed' : 'not pressed'}</span>
          </div>
        )
      }

      const UncontrolledButtonSwitch = uncontrolled({
        prop: 'pressed',
        defaultProp: 'autoPressed',
        handlers: {
          onClick: () => pressed => pressed,
        },
      })(ButtonSwitch)

      render(<UncontrolledButtonSwitch />, root)

      root.querySelector('#press').click()

      equal(root.querySelector('span').textContent, 'pressed')

      root.querySelector('#unpress').click()

      equal(root.querySelector('span').textContent, 'not pressed')
    })
  })
})
