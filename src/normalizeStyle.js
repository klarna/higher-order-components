import React from 'react'
import { getDisplayName, wrapDisplayName, setDisplayName } from 'recompose'

const fixLineHeight = (lineHeight, displayName) => {
  if (typeof lineHeight === 'string') {
    throw new Error(
      `The element \`${displayName}\` has a \`lineHeight\` set with a String. Use numbers instead.`
    )
  }

  return global.navigator && global.navigator.product === 'ReactNative'
    ? lineHeight
    : `${lineHeight}px`
}

const fixStyle = (style, displayName) => ({
  ...style,
  lineHeight: style.lineHeight ? fixLineHeight(style.lineHeight, displayName) : undefined,
})

export default Target =>
  setDisplayName(wrapDisplayName(Target, 'normalizeStyle'))(({ style, ...props }) =>
    <Target style={style ? fixStyle(style, getDisplayName(Target)) : undefined} {...props} />
  )
