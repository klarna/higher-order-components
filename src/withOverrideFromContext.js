import React from 'react'
import getDisplayName from 'recompose/getDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { withPropsFromContext } from 'react-context-props'
import deepMerge from 'deepmerge'

export default Target => {
  const name = getDisplayName(Target)

  const WithOverrideFromContext = withPropsFromContext([name])(props => {
    const Override = props[name]

    const propsWithoutOverride = { ...props }
    delete propsWithoutOverride[name]

    if (typeof Override === 'function') {
      return <Override {...propsWithoutOverride} />
    } else if (Override != null) {
      return <Target {...deepMerge(Override, propsWithoutOverride)} />
    } else {
      return <Target {...propsWithoutOverride} />
    }
  })

  WithOverrideFromContext.displayName = wrapDisplayName(Target, 'withOverrideFromContext')

  return WithOverrideFromContext
}
