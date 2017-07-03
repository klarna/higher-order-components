import React from 'react'
import getDisplayName from 'recompose/getDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { withPropsFromContext } from 'react-context-props'
import deepMerge from 'deepmerge'

export default Target => {
  const name = getDisplayName(Target)

  const WithOverrideFromContext = withPropsFromContext([name])(props => {
    const Override = props[name]

    const propsWithNoOverride = { ...props }
    delete propsWithNoOverride[name]

    if (typeof Override === 'function') {
      return <Override {...propsWithNoOverride} />
    } else {
      return <Target {...deepMerge(Override, propsWithNoOverride)} />
    }
  })

  WithOverrideFromContext.displayName = wrapDisplayName(Target, 'withOverrideFromContext')

  return WithOverrideFromContext
}
