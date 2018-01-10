import React from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

const deprecate = ({ name, useInstead, readMore }) =>
  process &&
  process.env &&
  process.env.NODE_ENV !== 'production' &&
  console &&
  console.error &&
  console.error(
    `Warning: '${name}' is deprecated and will be removed in the next major version.` +
      (useInstead ? `\nUse '${useInstead}' instead.` : '') +
      (readMore ? `\nRead more on ${readMore}` : '')
  )

export default ({ name, useInstead, readMore }) => Target => {
  function WithDeprecationWarning(props) {
    deprecate({
      name: name || Target.displayName || Target.name,
      useInstead,
      readMore,
    })

    return <Target {...props} />
  }

  WithDeprecationWarning.displayName = wrapDisplayName(Target, 'withDeprecationWarning')

  return WithDeprecationWarning
}
