import React from 'react'
import {withPropsFromContext} from 'react-context-props'

const themeable = (adapter) => (Target) => {
  const Themeable = withPropsFromContext(
    ['customizations']
  )(
    ({ customizations, ...props }) => (
      <Target
        {...{
          ...props,
          ...customizations ? adapter(customizations, props) : {}
        }}
      />
    )
  )

  Themeable.displayName = Target.displayName || Target.name

  return Themeable
}

export default themeable
