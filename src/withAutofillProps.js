import React, { Component } from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'

const startAnimationName = 'onAutofillStart'
const endAnimationName = 'onAutofillCancel'
const styleElementId = 'autofill-style'
const counterAttribute = 'data-counter'

const isWebkit = () => navigator.userAgent.indexOf('WebKit') !== -1

function emptyAnimation(animationName) {
  return `
    @keyframes ${animationName} {
      from {/**/}
      to {/**/}
    }
  `
}

function injectKeyFrames() {
  const autofillStartEmptyKeyframesStyle = emptyAnimation(startAnimationName)
  const autofillEndEmptyKeyframesStyle = emptyAnimation(endAnimationName)

  injectStyle(autofillStartEmptyKeyframesStyle)
  injectStyle(autofillEndEmptyKeyframesStyle)
}

function injectStyle(style) {
  let styleSheet = document.getElementById(styleElementId).sheet

  styleSheet.insertRule(style, styleSheet.cssRules.length)
}

function injectAutofillHook() {
  // Expose a hook for JavaScript when autofill is shown.
  // JavaScript can capture 'animationstart' events
  // Change the backgound color _really slowly_
  const autofillHook = `
    input:-webkit-autofill {
      animation-name: ${startAnimationName};
      transition: background-color 50000s ease-in-out 0s;
    }
  `

  // Expose a hook for JavaScript when autofill is no longer shown.
  // JavaScript can capture 'animationstart' events
  const notAutofillHook = `
    input:not(:-webkit-autofill) {
      animation-name: ${endAnimationName};
    }`

  injectStyle(autofillHook)
  injectStyle(notAutofillHook)
}

function registerAutofill() {
  if (!isWebkit()) return

  let autofillStyle = document.getElementById(styleElementId)

  if (!autofillStyle) {
    autofillStyle = document.createElement('style')
    autofillStyle.id = styleElementId
    autofillStyle.setAttribute(counterAttribute, 0)
    document.head.appendChild(autofillStyle)

    injectKeyFrames()
    injectAutofillHook()
  }

  let usageCounter = autofillStyle.getAttribute(counterAttribute)
  usageCounter++
  autofillStyle.setAttribute(counterAttribute, usageCounter)
}

function unregisterAutofill() {
  if (!isWebkit()) return

  let autofillStyle = document.getElementById(styleElementId)
  let usageCounter = autofillStyle.getAttribute(counterAttribute)
  usageCounter--
  autofillStyle.setAttribute(counterAttribute, usageCounter)

  if (usageCounter === 0) {
    // remove element
    autofillStyle.outerHTML = ''
  }
}

export default autofillProps => Target => {
  class WithAutofillProps extends Component {
    constructor() {
      super()

      this.state = { autofill: false }
      this.handleAnimation = this.handleAnimation.bind(this)
    }

    componentDidMount() {
      registerAutofill()
    }

    componentWillUnmount() {
      unregisterAutofill()
    }

    handleAnimation(e) {
      switch (e.animationName) {
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
          onAnimationStart={this.handleAnimation}
          {...this.props}
          {...autofill && autofillProps}
        />
      )
    }
  }

  WithAutofillProps.displayName = wrapDisplayName(Target, 'withAutofillProps')

  return WithAutofillProps
}
