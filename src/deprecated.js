import React from 'react'

const deprecate = ({name, replacement, reference}) => console && console.error && console.error(
  `Warning: '${name}' is deprecated and will be removed in the next major version.` +
  (replacement ? `\nUse '${replacement}' instead.` : '') +
  (reference ? `\nRead more on ${reference}` : '')
)

export default (Component, componentName, replacement, reference) => (props) => {
  deprecate({
    name: componentName || Component.displayName || Component.name,
    replacement,
    reference
  })

  return <Component {...props} />
}
