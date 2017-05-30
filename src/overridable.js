import React, { PureComponent } from 'react'
import { withPropsFromContext } from 'react-context-props'

export default (styles = {}, designName) => Target => {
  class OverridableComponent extends PureComponent {
    constructor(props) {
      super(props)

      this.designName = designName || Target.displayName || Target.name
      this.Component = Target
    }

    getOverride() {
      if (!this.props.design.getOverrideFor) {
        return { ...styles, ...this.props.styles }
      }
      const override = this.props.design.getOverrideFor(
        Object.assign(Target, { designName: this.designName })
      )
      this.Component = override.Component
      return { ...styles, ...this.props.styles, ...override.css }
    }

    render() {
      const { design, ...otherProps } = this.props // eslint-disable-line
      const props = { ...otherProps, styles: this.getOverride() }
      return <this.Component {...props} />
    }
  }

  OverridableComponent.displayName = Target.displayName || Target.name

  OverridableComponent.defaultProps = {
    design: {},
    styles: {},
  }

  return withPropsFromContext(OverridableComponent, ['design'])
}
