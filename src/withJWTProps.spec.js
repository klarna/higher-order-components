import React, { Component } from 'react'
import { render } from 'react-dom'
import { equal } from 'assert'
import jwt from 'jwt-simple'

import withJWTProps from './withJWTProps'

describe('withJWTProps', () => {
  const clientToken = jwt.encode(
    {
      propA: 'prop A',
      propB: 'prop B',
    },
    'secret'
  )
  const updatedClientToken = jwt.encode(
    {
      propA: 'prop A updated',
      propB: 'prop B updated',
    },
    'secret'
  )
  const root = document.createElement('div')

  it('wraps the name of the original component', () => {
    const Target = () => null
    const DecoratedTarget = withJWTProps('clientToken')(Target)

    equal(DecoratedTarget.displayName, 'withJWTProps(Target)')
  })

  it('should pass decoded JWT token props', done => {
    class Target extends Component {
      constructor(props) {
        super(props)

        equal(props.propA, 'prop A')
        equal(props.propB, 'prop B')
        done()
      }

      render() {
        return null
      }
    }

    const DecoratedTarget = withJWTProps('clientToken')(Target)

    render(<DecoratedTarget clientToken={clientToken} />, root)
  })

  it('should map decoded JWT token to provided props', done => {
    class Target extends Component {
      constructor(props) {
        super(props)

        equal(props['prop-A'], 'prop A')
        equal(props['prop-B'], 'prop B')
        done()
      }

      render() {
        return null
      }
    }

    const DecoratedTarget = withJWTProps('clientToken', {
      propA: 'prop-A',
      propB: 'prop-B',
    })(Target)

    render(<DecoratedTarget clientToken={clientToken} />, root)
  })

  it('should update props when token was changed', done => {
    class Target extends Component {
      componentDidUpdate() {
        equal(this.props.propA, 'prop A updated')
        equal(this.props.propB, 'prop B updated')
        done()
      }

      render() {
        return null
      }
    }

    const DecoratedTarget = withJWTProps('clientToken')(Target)

    render(<DecoratedTarget clientToken={clientToken} />, root)
    render(<DecoratedTarget clientToken={updatedClientToken} />, root)
  })

  it('should invoke `onError` callback when something went wrong', done => {
    const Target = () => null
    const DecoratedTarget = withJWTProps('clientToken')(Target)

    render(
      <DecoratedTarget
        clientToken="hej"
        onJWTError={e => {
          equal(e instanceof Error, true)
          done()
        }}
      />,
      root
    )
  })
})
