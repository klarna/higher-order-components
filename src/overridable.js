import React, {PureComponent} from 'react'
import {withPropsFromContext} from 'react-context-props'

export default (styles = {}, designName) => (Target) => {
  class OverridableComponent extends PureComponent {
    constructor (props) {
      super(props)

      this.designName = designName || Target.displayName || Target.name
      this.Component = Target
    }

    componentWillMount () {
      this.mergeStylesProp(this.props.styles)
      this.getAndSetOverride()
    }

    componentWillReceiveProps ({ styles }) {
      if (styles && Object.keys(styles).length > 0) {
        this.mergeStylesProp(styles)
      }
    }

    componentWillUpdate () {
      this.getAndSetOverride()
    }

    mergeStylesProp (stylesProp) {
      this.styles = {...styles, ...stylesProp}
    }

    getAndSetOverride () {
      if (!this.props.design.getOverrideFor) {
        return
      }
      const override = this.props.design.getOverrideFor(
        Object.assign(Target, { designName: this.designName })
      )
      this.Component = override.Component
      this.styles = {...this.styles, ...override.css}
    }

    render () {
      const {design, ...otherProps} = this.props // eslint-disable-line
      const props = {...otherProps, styles: this.styles}
      return <this.Component {...props} />
    }
  }

  OverridableComponent.displayName = Target.displayName || Target.name

  OverridableComponent.defaultProps = {
    design: {},
    styles: {}
  }

  return withPropsFromContext(
    OverridableComponent,
    ['design']
  )
}
