import React from 'react'
import pick from 'ramda/src/pick'
import compose from 'recompose/compose'
import wrapDisplayName from 'recompose/wrapDisplayName'
import setDisplayName from 'recompose/setDisplayName'
import deepMerge from 'deepmerge'

export default (propsToPick, getDefaultStyleSheet) => Target =>
  compose(
    setDisplayName(wrapDisplayName(Target, 'withStyleSheetOverride'))
  )(({ getStyleSheet = () => ({}), ...props }) =>
    <Target
      styleSheet={deepMerge(
        getDefaultStyleSheet(pick(propsToPick, props)),
        getStyleSheet(pick(propsToPick, props))
      )}
      {...props}
    />
  )
