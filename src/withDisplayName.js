import React from 'react'

const takeAName = name => {
  const withDisplayName = TargetOrName => {
    if (typeof TargetOrName === 'string') {
      return takeAName(`${name}.${TargetOrName}`)
    } else {
      const WithDisplayName = (props) => <TargetOrName {...props} />

      WithDisplayName.displayName = name

      return WithDisplayName
    }
  }

  return withDisplayName
}

export default takeAName
