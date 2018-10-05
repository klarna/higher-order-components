import React from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

export default ({ name, useInstead, readMore }) => Target => {
  const DeprecateProp = props => {
    props[name] &&
      process &&
      process.env &&
      process.env.NODE_ENV !== 'production' &&
      console &&
      console.error &&
      console.error(
        `Warning: '${name}' prop is deprecated and will be removed in the next major version.` +
          (useInstead ? `\nUse '${useInstead}' instead.` : '') +
          (readMore ? `\nRead more on ${readMore}` : '')
      )

    return <Target {...props} />
  }

  DeprecateProp.displayName = wrapDisplayName(Target, 'withDeprecatedProp')

  return DeprecateProp
}
