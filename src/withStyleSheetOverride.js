import React from 'react'
import compose from 'recompose/compose'
import wrapDisplayName from 'recompose/wrapDisplayName'
import setDisplayName from 'recompose/setDisplayName'
import deepMerge from 'deepmerge'

const styleWrapperFunction = (defaultStyle, overrideStyle = {}) => {
  if (typeof defaultStyle === 'function') {
    return (...args) =>
      deepMerge(
        defaultStyle(...args),
        typeof overrideStyle === 'function' ? overrideStyle(...args) : overrideStyle
      )
  } else {
    return deepMerge(defaultStyle, overrideStyle)
  }
}

const merge = (defaultStyleSheet, overrideStyleSheet = {}) =>
  Object.keys(defaultStyleSheet).reduce(
    (result, key) => ({
      ...result,
      [key]: styleWrapperFunction(defaultStyleSheet[key], overrideStyleSheet[key]),
    }),
    {}
  )

export default getDefaultStyleSheet => Target =>
  compose(
    setDisplayName(wrapDisplayName(Target, 'withStyleSheetOverride'))
  )(({ getStyleSheet = () => ({}), ...props }) =>
    <Target styleSheet={merge(getDefaultStyleSheet(props), getStyleSheet(props))} {...props} />
  )
