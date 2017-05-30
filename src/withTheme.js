import React from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { withPropsFromContext } from 'react-context-props'

const withTheme = adapter => Target => {
  const WithTheme = withPropsFromContext(['customizations'])(({ customizations, ...props }) => (
    <Target
      {...{
        ...props,
        ...(customizations ? adapter(customizations, props) : {}),
      }}
    />
  ))

  WithTheme.displayName = wrapDisplayName(Target, 'withTheme')

  return WithTheme
}

export default withTheme
