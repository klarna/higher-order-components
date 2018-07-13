# @klarna/higher-order-components

[![Build Status](https://travis-ci.org/klarna/higher-order-components.svg)](https://travis-ci.org/klarna/higher-order-components)
[![npm version](https://img.shields.io/npm/v/@klarna/higher-order-components.svg?maxAge=10000)](https://www.npmjs.com/package/@klarna/higher-order-components)

This library is a collection of useful React higher-order Components.

## normalizeStyle (Component)

**normalizeStyle** is a work-in-progress higher-order component that will take care of cleaning up and normalizing the `style` prop so that all properties work both in web and native, even adding vendor prefixes if necessary.

Currently only `lineHeight` normalization is implemented.

Using it is simple enough:

```js
import { normalizeStyle } from '@klarna/higher-order-components'

function MyDiv ({style}) {
  return <div style={style}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </div>
}

export default normalizeStyle(MyDiv)
```

## withStyleSheetOverride (getDefaultStyleSheet) (Component)

**withStyleSheetOverride** provides a flexible way of setting style sheets in the components. It takes a function from `props` to a stylesheet structure. It also provides the ability for consumers of the component to pass their own `getStyleSheet` prop that takes the props and returns another style sheet: `withStyleSheetOverride` will deep merge this override style sheet on top of the default styles. For example:

```javascript
function Header({styleSheet, title, tagline}) {
  return <header>
    <h1 style={styleSheet.title}>{title}</h1>
    <p style={styleSheet.tagline}>{tagline}</p>
  </header>
}

const EnhancedTitle = withStyleSheetOverride(
  ({tagline, pressed}) => ({
    title: {
      color: tagline && tagline.length > 0 ? 'blue' : 'black'
    },
    tagline: {
      color: pressed ? 'lightblue' : 'gray'
    }
  })
)(Header)

render(
  <EnhancedTitle
    tagline='Hello!'
    pressed
    getStyleSheet={({tagline, pressed}) => ({
      title: {
        background: tagline && tagline.length > 0 ? 'white' : 'pink'
      },
      tagline: {
        background: pressed ? 'white' : 'pink'
      }
    })}
  />,
  document.getElementById('root')
)
```

…will render the `h1` with `{ color: 'blue', background: 'white' }` and the `p` with `{ color: 'lightblue', background: 'white' }`.

Functions as styles instead of objects are also supported. This would work as well:

```javascript
function Header({styleSheet, title, tagline}) {
  return <header>
    <h1 style={styleSheet.title(title)}>{title}</h1>
    <p style={styleSheet.tagline}>{tagline}</p>
  </header>
}

const EnhancedTitle = withStyleSheetOverride(
  ({pressed}) => ({
    title: text => ({
      color: text.length > 30 ? 'red' : 'black'
    }),
    tagline: {
      color: pressed ? 'lightblue' : 'gray'
    }
  })
)(Header)

render(
  <EnhancedTitle
    tagline='Hello!'
    pressed
    getStyleSheet={({pressed}) => ({
      title: text => ({
        background: text.length < 10 ? 'white' : 'pink'
      }),
      tagline: {
        background: pressed ? 'white' : 'pink'
      }
    })}
  />,
  document.getElementById('root')
)
```

## withDisplayName (string) ... (Component)

**withDisplayName** let's you easily set the `displayName` of components.

For example:

```javascript
import {withDisplayName} from '@klarna/higher-order-components'

function UnnamedComponent () {
  return <hr />
}

const Hr = withDisplayName('Hr')(UnnamedComponent)

Hr.displayName // 'Hr'
```

This function though takes an arbitrary number of parameters. You can use this to generate functions to set namespaced `displayName`s:

```javascript
import {withDisplayName} from '@klarna/higher-order-components'

function UnnamedComponent () {
  return <hr />
}

const Hr = withDisplayName('Basic')('HTML')('Hr')(UnnamedComponent)

Hr.displayName // 'Basic.HTML.Hr'
```

## withFocusProps (props) (Component)

Adds the props to the component if the element is focused.

```javascript
// InputBlock.js
import {withFocusProps} from '@klarna/higher-order-components'

function InputBlock ({focused, onFocus, onBlur}) {
  return <div>
    <input onFocus={onFocus} onBlur={onBlur} />
    {focused ? 'It’s focused!' : 'It’s not focused'}
  </div>
}

export withFocusProps({
  focused: true
})(InputBlock)
```

## withKeyboardFocusProps (props) (Component)

Adds the props to the component if the element is focused by keyboard actions.

```javascript
// InputBlock.js
import {withKeyboardFocusProps} from '@klarna/higher-order-components'

function InputBlock ({keyboardFocused, onFocus, onBlur, onMouseDown, onMouseUp}) {
  return <div>
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />
    {keyboardFocused ? 'It’s focused via keyboard!' : 'It’s not focused'}
  </div>
}

export withKeyboardFocusProps({
  keyboardFocused: true
})(InputBlock)
```

## withHoverProps (props) (Component)

Adds the props to the component if the element is hovered.

```javascript
// Hovereable.js
import {withHoverProps} from '@klarna/higher-order-components'

function Hovereable ({hovered, onMouseOver, onMouseOut}) {
  return <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
    {hovered ? 'I’m hovered!' : 'I’m not hovered'}
  </div>
}

export withHoverProps({
  hovered: true
})(Hovereable)
```

## withPressedProps (props) (Component)

Adds the props to the component if the element is being pressed with the mouse.

```javascript
// Pressable.js
import {withPressedProps} from '@klarna/higher-order-components'

function Pressable ({pressed, onMouseDown, onMouseUp}) {
  return <div onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
    {pressed ? 'I’m pressed!' : 'I’m not pressed'}
  </div>
}

export withPressedProps({
  pressed: true
})(Pressable)
```

## withTouchProps (props) (Component)

Adds the props to the component if the element is being touched.

```javascript
// Pressable.js
import {withTouchProps} from '@klarna/higher-order-components'

function Touchable ({touched, onTouchStart, onTouchEnd}) {
  return <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    {touched ? 'I’m touched!' : 'I’m not touched'}
  </div>
}

export withTouchProps({
  touched: true
})(Touchable)
```

## withNotifyOnLowFPS ({threshold: number}) (Component)

**withNotifyOnLowFPS** allows you to track the frames per second that the browser window is achieving when your component is rendered. This is particularly useful for components that are animated.

In order to do this, **withNotifyOnLowFPS** uses the `collect-fps` library to collect the rate in which `requestAnimationFrame` is being called. If the frames per second drop below a threshold (30 FPS by default) then a property is set in the decorated component to notify that the animation speed is slow (the property is `lowFPS` by default).

**withNotifyOnLowFPS** passes two props down to the inner component:

- `onStartFPSCollection`: to be called when the inner component starts a heavy animation of some sort
- `onEndFPSCollection`: to be called when the animation is complete

**withNotifyOnLowFPS** updates the value of the `lowFPS` prop when the collection is completed.

```javascript
class AnimatedComponent extends Component {
  componentDidMount () {
    // Say that the animation starts when the component is mounted and that
    // it takes a fixed time to complete
    this.props.onStartFPSCollection()

    setTimeout(() => {
      this.props.onEndFPSCollection()
    }, 300)
  }

  render () {
    return <div
      className={this.props.lowFPS ? 'no-animation' : 'expensive-animation'}
    />
  }
}

const DecoratedAnimatedComponent = withNotifyOnLowFPS({
  threshold: 30, // default threshold of frames per second. Below this number it will be considered to be low frame rate
})(AnimatedComponent)
```

The decorated component exposes the `onLowFPS` handler. This handler will be called if the FPS counts ever drops below the threshold.

```javascript
import {render} from 'react-dom'

render(
  <DecoratedAnimatedComponent
    onLowFPS={() => console.log('fps count dropped below threshold')}
  />,
  domElement
)
```

## withDeprecationWarning (config) (Component)

A component wrapped with `withDeprecationWarning` will print an error to the console when used so that consumers know they need to update their codebase to the latest component. It can be configured with the name of a component to use instead, and a URL where to read more.

```javascript
import React from 'react'
import {withDeprecationWarning} from '@klarna/higher-order-components'

function ObsoleteUnderlinedComponent ({ children }) {
  return <u>{children}</u>
}

export default withDeprecationWarning({
  readMore: 'http://example.com/why-old-component-is-deprecated',
  useInstead: 'Underlined'
})(ObsoleteUnderlinedComponent)
```

If the component doesn’t have a defined `name` or `displayName`, you can specify its name:

```javascript
withDeprecationWarning({
  …,
  name: 'ObsoleteUnderlinedComponent'
})
```

## withUniqueFormIdentifier

**withUniqueFormIdentifier** is a helper for components that need a `name` prop, so that it defaults to a namespaced UUID if not specified. This is useful for components that wrap `checkbox` or `radio` input types, which will not behave properly without an unique name. When using those Component types as fully controlled, names are unimportant, so it’s easy to forget to add them. This is a common source of problem for this family of components, which **withUniqueFormIdentifier** helps you to avoid.

Say that you have the component:

```javascript
// Radio.jsx
import React from 'react'

function Radio ({name, value, onChange}) {
  return <div>
    <p>
      <input
        type='radio'
        name={name}
        id={`${name}-acceptable`}
        value='acceptable'
      />
      <label
        htmlFor={`${name}-acceptable`}>
        Acceptable
      </label>
    </p>

    <p>
      <input
        type='radio'
        name={name}
        id={`${name}-adequate`}
        value='adequate'
      />
      <label
        htmlFor={`${name}-adequate`}>
        Adequate
      </label>
    </p>

    <p>
      <input
        type='radio'
        name={name}
        id={`${name}-close-enough`}
        value='close-enough'
      />
      <label
        htmlFor={`${name}-close-enough`}>
        Close enough
      </label>
    </p>
  </div>
}

export default Radio
```

…you can add the `withUniqueFormIdentifier` higher-order component around it:

```diff
+import {withUniqueFormIdentifier} from '@klarna/higher-order-components'

-export default Radio
+export default withUniqueFormIdentifier(Radio)
```

…and it no longer matters if you forget to set a `name` when using it, unless you actually care about that name of course.

The UUID for this would look something like: `Radio-c821f424-053a-4175-8112-1e0a6370b4cc`

## withOverrideFromContext

**Overridable** provides a way of injecting props or replacing the implementation of the component anywhere in the React tree (using `React.context`). This is useful for extreme customizations.

The override is done by setting a prop in the `React.context` named after the `displayName` of the target component. This prop can be:

- An object structure. If an object structure is set, then the behavior will be that the props actually passed to the component will be deep merged with the object structure found in the context (local props take precedence).
- A component implementation. If a component is passed, then that function will be called and rendered instead of the original implementation.

This example illustrates both use cases:

```javascript
import React from 'react'
import PropTypes from 'prop-types'
import {render} from 'react-dom'
import {getContextualizer} from 'react-context-props'
import {withOverrideFromContext} from '@klarna/higher-order-components'

// For Button we will just partially override the style prop
const Button = ({style}) => <button style={style}>Plain button</button>
// For Input we will just replace the implementation
const Input = () => <input type='radio' />

const OverridableButton = withOverrideFromContext(Button)
const OverridableInput = withOverrideFromContext(Input)

const Overrides = getContextualizer({
  Button: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func
  ]),
  Input: PropTypes.oneOf([
    PropTypes.object,
    PropTypes.func
  ])
}, 'overrides')

render(
  <Overrides Button={{color: 'blue'}} Input={() => <input type='tel' />}>
    <OverridableButton style={{background: 'yellow'}} />
    <OverridableInput />
  </Overrides>,
  document.getElementById('root')
)
```

## withTheme (themeToProps) (Component)

**withTheme** allows you to configure your components so that they can take information from the `React.context` to customize some props, whenever in the tree they might be. This higher-order component is useful for theming your components without having to use `React.context` explicitly in your component implementation.

Say you have a set of textual components that support a small version of themselves via the `small: boolean` prop.

```javascript
// Title.jsx
function Title ({children, small}) {
  return <h2 style={{ fontSize: small ? '12px' : '18px' }}>{children}</h2>
}

export default Title
```

```javascript
// Paragraph.jsx
function Paragraph ({children, small}) {
  return <p style={{ fontSize: small ? '12px' : '18px' }}>{children}</p>
}

export default Paragraph
```

…and you compose them in a more complex view layer:

```javascript
// MoreComplexView.jsx
import React from 'react'
import {render} from 'react-dom'

function MoreComplexView () {
  return <div>
    <Title>Hello world!</Title>
    <div>
      <Paragraph>
        Lorem ipsum dolor sit amet et conseqtetur
      </Paragraph>
    </div>
  </div>
}

render(
  <MoreComplexView />,
  document.getElementById('root')
)
```

You could of course pass a `small` prop to the MoreComplexView and have that one send the value down to each Title and Paragraph, but it can easily get cumbersome. If you happen, for example, to use a component inside MoreComplexView that in turn uses Title or Paragraph inside, you would have to pass `small` to that new component as well, and so on and so forth. What you really want to do is to set a global option for whether the text is regular or small, which is what React.context is for. Adding support for contextProps in your Title and Paragraph components makes their implementation complex though: there is a more elegant way to do it, with the **withTheme** higher-order component:

```diff
// Title.jsx
+import {withTheme} from '@klarna/higher-order-components'

function Title ({children, small}) {
  return <h2 style={{ fontSize: small ? '12px' : '18px' }}>{children}</h2>
}

-export default Title
+export default withTheme((customizations, props) => ({
+  small: customizations.textSize === 'small'
+}))(Title)
```

```diff
// Paragraph.jsx
+import {withTheme} from '@klarna/higher-order-components'

function Paragraph ({children, small}) {
  return <p style={{ fontSize: small ? '12px' : '18px' }}>{children}</p>
}

-export default Paragraph
+export default withTheme((customizations, props) => ({
+  small: customizations.textSize === 'small'
+}))(Paragraph)
```

The predicate function that you pass to `withTheme` will only be called if there is a `customizations` from in the context, which means that wrapping your components with `withTheme` is safe since nothing will change unless that prop is set.

Now you only need to set the prop in the React.context. You can easily do that with a little help from [`react-context-props`](https://github.com/xaviervia/react-context-props):

```javascript
// Theme.jsx
import React from 'react'
import PropTypes from 'prop-types'
import {getContextualizer} from 'react-context-props'

const Theme = getContextualizer({
  customizations: PropTypes.shape({
    textSize: PropTypes.oneOf(['small', 'regular'])
  })
})

export default Theme
```

```diff
// MoreComplexView.jsx
import React from 'react'
import {render} from 'react-dom'
+import Theme from './Theme'

function MoreComplexView () {
  return <div>
    <Title>Hello world!</Title>
    <div>
      <Paragraph>
        Lorem ipsum dolor sit amet et conseqtetur
      </Paragraph>
    </div>
  </div>
}

render(
-  <MoreComplexView />,
+  <Theme customizations={{textSize: 'small'}}>
+    <MoreComplexView />
+  </Theme>,
  document.getElementById('root')
)
```

**TODO** explain:
- what the result of the predicate function will be used for (give an example)
- why the props are necessary in the predicate function (again, an example)
- how this could be used to make arbitrary components themeable, including third party ones

## withUncontrolledProp (config) (Component)

**withUncontrolledProp** is a generic method of making a controlled property of a Component behave as an uncontrolled prop when not set. This is the default behavior that React exposes for form components such as `<input>`:

- `<input value='Controlled' />` and `<input value='' />` will have a controlled value
- `<input />` and `<input defaultValue='Initial value, before user interaction' />` will have an uncontrolled value

By using the **withUncontrolledProp**, the prop `prop` will be treated as uncontrolled if not defined by the user and the functions specified on `handlers` will be called with the current props and the arguments that the original handlers got called with, and the return value will be used as the new value for the prop. `defaultProp` allows you to configure a new prop that, when used, will set an initial value to the prop but make it stay uncontrolled.

```javascript
import {withUncontrolledProp} from '@klarna/higher-order-components'

function Counter ({value, onClick}) {
  return <div>
    <button onClick={onClick}>
      Add one
    </button>
    {value}
  </div>
}

export default withUncontrolledProp({
  prop: 'value',
  defaultProp: 'defaultValue',
  handlers: {
    onClick: props => e => props.value + 1
  }
})(Counter)
```

> The behavior of this higher-order component is very close to combining `withState` and `withHandlers` from [`recompose`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate). The reason why it was created anyway is that it also provides the `defaultProp`.

## withJwtProps (inputPropName, outputPropsMapping) (Component)

**withJwtProps** decodes [JWT](https://jwt.io/) encoded token (passed in with props as `inputPropName`) and provides its fields to Target component spread as props (use optional `outputPropsMapping` argument to "remap" their names):

```js
import React from 'react'
import {render} from 'react-dom'
import {withJwtProps} from '@klarna/higher-order-components'
import jwt from 'jwt-simple'

const clientToken = jwt.encode({
  foo: 'FOO!',
  bar: 'BAR!'
})

const Target = ({ propA, propB }) => (
  <h1>{propA} {propB}</h1>
)
const EnhancedTarget = withJwtProps(
  'clientToken',
  {
    foo: 'propA',
    bar: 'propB'
  }
)(Target)

render(
  <EnhancedTarget clientToken={clientToken} />,
  document.getElementById('root')
)
```

## withAutofillProps (props) (Component)

Adds the props to the component if the element is autofilled.

```javascript
// InputBlock.js
import {withAutofillProps} from '@klarna/higher-order-components'

function InputBlock ({autofill, onAnimationStart}) {
  return <div>
    <input name='email' onAnimationStart={onAnimationStart}  />
    {autofill ? 'It’s autofilled!' : 'It’s not autofilled'}
  </div>
}

export withAutofillProps({
  autofill: true
})(InputBlock)
```

## License

See [LICENSE](LICENSE)

MIT License
