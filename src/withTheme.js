import React from 'react'
import {withPropsFromContext} from 'react-context-props'

const withTheme = adapter => Target => {
  const WithTheme = withPropsFromContext(
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

  WithTheme.displayName = Target.displayName || Target.name

  return WithTheme
}

export default withTheme
