import {equal} from 'assert'
import withDisplayName from './withDisplayName'

describe('withDisplayName', () => {
  describe('when invoked with a single name', () => {
    it('sets a displayName', () => {
      function Component () {}

      equal(
        withDisplayName('Foo')(Component).displayName,
        'Foo'
      )
    })
  })

  describe('when invoked with a several names', () => {
    it('sets a namespaced displayName', () => {
      function Component () {}

      equal(
        withDisplayName('Foo')('Bar')('Baz')(Component).displayName,
        'Foo.Bar.Baz'
      )
    })
  })
})
