import {equal} from 'assert'
import namespacedDisplayName from './namespacedDisplayName'

describe('namespacedDisplayName', () => {
  it('sets a namespaced displayName', () => {
    const Component = function () {}
    const namespace = 'foo'
    const name = 'bar'

    equal(
      namespacedDisplayName(namespace)(name)(Component).displayName,
      `${namespace}.${name}`
    )
  })
})
