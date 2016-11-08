import React from 'react'
import {withPropsFromContext} from 'react-context-props'

const themeable = (adapter) => (Target) => {
  const Themeable = withPropsFromContext(
    ({ customizations, ...props }) => (
      <Target
        {...{
          ...props,
          ...customizations ? adapter(customizations, props) : {}
        }}
      />
    ),
    ['customizations']
  )

  Themeable.displayName = Target.displayName || Target.name

  return Themeable
}

export default themeable
