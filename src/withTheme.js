import React from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { withPropsFromContext } from 'react-context-props'

const withTheme = adapter => Target => {
  const WithTheme = withPropsFromContext(['theme'])(({ theme, ...props }) =>
    <Target
      {...{
        ...props,
        ...(theme ? adapter(theme, props) : {}),
      }}
    />
  )

  WithTheme.displayName = wrapDisplayName(Target, 'withTheme')

  return WithTheme
}

export default withTheme
