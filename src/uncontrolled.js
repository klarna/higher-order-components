import React, { PureComponent } from 'react'

const makeUncontrolledHandler = ({
  component,
  prop: propName,
  props,
  handlerName,
  higherOrderComponentHandler,
}) => (...eventArgs) => {
  if (props[propName] == null) {
    component.setState({
      [propName]: higherOrderComponentHandler({
        ...component.state,
        ...props,
      })(...eventArgs),
    })
  }

  if (props[handlerName]) {
    props[handlerName](...eventArgs)
  }
}

export default ({ defaultProp, handlers, prop, resetHandlerName }) => Target => {
  class Uncontrolled extends PureComponent {
    componentDidMount() {
      this.setState({
        [prop]: this.props[prop] != null ? this.props[prop] : this.props[defaultProp],
      })
    }

    render() {
      const props = {
        ...Object.keys(this.props)
          .filter(key => key !== defaultProp)
          .reduce((copiedProps, propName) => {
            copiedProps[propName] = this.props[propName]
            return copiedProps
          }, {}),

        ...Object.keys(handlers)
          .map(handlerName => [
            handlerName,
            makeUncontrolledHandler({
              props: this.props,
              prop,
              component: this,
              handlerName,
              higherOrderComponentHandler: handlers[handlerName],
            }),
          ])
          .reduce((handlerProps, [handlerName, handlerFunction]) => {
            handlerProps[handlerName] = handlerFunction
            return handlerProps
          }, {}),
      }

      return <Target {...this.state} {...props} />
    }
  }

  Uncontrolled.displayName = Target.displayName || Target.name

  return Uncontrolled
}
