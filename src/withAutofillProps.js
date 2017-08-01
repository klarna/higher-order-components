import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

const startAnimationName = 'onAutofillStart'
const endAnimationName = 'onAutofillCancel'
const styleElementId = 'autofill-style'

const isWebkit = () => navigator.userAgent.indexOf('WebKit') !== -1

const emptyAnimation = animationName => {
  return `
    @keyframes ${animationName} {
      from {/**/}
      to {/**/}
    }
  `
}

const injectStyle = style => {
  let styleElement = document.getElementById(styleElementId)

  if (!styleElement) {
    styleElement = document.createElement('style')
    styleElement.id = styleElementId
    document.head.appendChild(styleElement)
  }

  let styleSheet = styleElement.sheet

  styleSheet.insertRule(style, styleSheet.cssRules.length)
}

function injectKeyFrames() {
  const autofillStartEmptyKeyframesStyle = emptyAnimation(startAnimationName)
  const autofillEndEmptyKeyframesStyle = emptyAnimation(endAnimationName)

  injectStyle(autofillStartEmptyKeyframesStyle)
  injectStyle(autofillEndEmptyKeyframesStyle)
}

function injectAutofillHook() {
  const autofillHook = `
    input:-webkit-autofill {
      // Expose a hook for JavaScript when autofill is shown.
      // JavaScript can capture 'animationstart' events
      animation-name: ${startAnimationName};

      // Make the backgound color become yellow _really slowly_
      transition: background-color 50000s ease-in-out 0s;
    }
  `

  const notAutofillHook = `
    input:not(:-webkit-autofill) {
      // Expose a hook for JavaScript when autofill is no longer shown.
      // JavaScript can capture 'animationstart' events
      animation-name: ${endAnimationName};
    }`

  injectStyle(autofillHook)
  injectStyle(notAutofillHook)
}

const registerAutofill = () => {
  const autofillInjected =
    window.__klarna_ui_components && window.__klarna_ui_components.isAutofillInjected

  if (!autofillInjected && isWebkit()) {
    injectKeyFrames()
    injectAutofillHook()

    if (window.__klarna_ui_components) {
      window.__klarna_ui_components.isAutofillInjected = true
    } else {
      window.__klarna_ui_components = { isAutofillInjected: true }
    }
  }
}

export default autofillProps => Target => {
  class WithAutofillProps extends Component {
    constructor() {
      super()

      registerAutofill()

      this.state = { autofill: false }
    }

    handleAnimation(animationName) {
      switch (animationName) {
        case startAnimationName:
          return this.setState({ autofill: true })

        case endAnimationName:
          return this.setState({ autofill: false })
      }
    }

    render() {
      const { autofill } = this.state

      return (
        <Target
          onAnimationStart={this.handleAnimation.bind(this)}
          {...this.props}
          {...autofill && autofillProps}
        />
      )
    }
  }

  WithAutofillProps.displayName = wrapDisplayName(Target, 'withAutofillProps')

  return WithAutofillProps
}
