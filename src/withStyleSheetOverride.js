import React from 'react'
import compose from 'recompose/compose'
import wrapDisplayName from 'recompose/wrapDisplayName'
import setDisplayName from 'recompose/setDisplayName'
import deepMerge from 'deepmerge'

export default getDefaultStyleSheet => Target =>
  compose(
    setDisplayName(wrapDisplayName(Target, 'withStyleSheetOverride'))
  )(({ getStyleSheet = () => ({}), ...props }) =>
    <Target styleSheet={deepMerge(getDefaultStyleSheet(props), getStyleSheet(props))} {...props} />
  )
