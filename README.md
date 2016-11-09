# @klarna/higher-order-components

This library is a collection of useful React higher-order Components.

**Note**: Documentation is a work in progress. It will probably be expanded with examples later on.

## Overridable

**Overridable** provides a way of replacing the styles or the full implementation of a component.

Say that you have a single component for a list of articles:

```javascript
function Blog ({name, articles}) {
  return <main>
    <h1>{name}</h1>

    {articles.map(({title, content}) => <Article key={title}>
      <Title>{title}</Title>
      <section>
        {content}
      </section>
    </Article>)}
  </main>
}
```

…and you want to reuse the **Blog** component but would like the **Title** to look different in your context. There are many ways of solving this issue, but in the particular use case of having exactly the same app rendering with many variations for some components, a solution is to have components that can be overridden from the outside — with a property in the React.context — so that the app is not concerned at all with the fact that the internal components might change.

**TODO**: Complete explanation with the `<Design>` component as well.

```javascript
// This is the object that you get when you
// import styles from './styles.css'
type CSSModule = {
  [key: string]: string
}

type Overridable = (
  cssModule: CSSModule,
  ?designName: string // The designName is by default the `name` or `displayName` of the Component
) => (target: ReactComponent) => Component
```

## Themeable

**Themeable** allows you to configure your components so that they can take information from the React.context to customize some props, whenever in the tree they might be. This higher-order component is useful for theming your components without having to use React.context explicitly in your component implementation.

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

You could of course pass a `small` prop to the MoreComplexView and have that one send the value down to each Title and Paragraph, but it can easily get cumbersome. If you happen, for example, to use a component inside MoreComplexView that in turn uses Title or Paragraph inside, you would have to pass `small` to that new component as well, and so on and so forth. What you really want to do is to set a global option for whether the text is regular or small, which is what React.context is for. Adding support for contextProps in your Title and Paragraph components makes their implementation complex though: there is a more elegant way to do it, with the **themeable** higher-order component:

```diff
// Title.jsx
+import {themeable} from '@klarna/higher-order-components'

function Title ({children, small}) {
  return <h2 style={{ fontSize: small ? '12px' : '18px' }}>{children}</h2>
}

-export default Title
+export default themeable((customizations, props) => ({
+  small: customizations.textSize === 'small'
+}))(Title)
```

```diff
// Paragraph.jsx
+import {themeable} from '@klarna/higher-order-components'

function Paragraph ({children, small}) {
  return <p style={{ fontSize: small ? '12px' : '18px' }}>{children}</p>
}

-export default Paragraph
+export default themeable((customizations, props) => ({
+  small: customizations.textSize === 'small'
+}))(Paragraph)
```

The predicate function that you pass to `themeable` will only be called if there is a `customizations` from in the context, which means that wrapping your components with `themeable` is safe since nothing will change unless that prop is set.

Now you only need to set the prop in the React.context. You can easily do that with a little help from [`react-context-props`](https://github.com/xaviervia/react-context-props):

```javascript
// Theme.jsx
import React, {PropTypes} from 'react'
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

## Uncontrolled decorator

**Uncontrolled** is a generic method of making a controlled property of a Component behave as an uncontrolled prop when not set. This is the default behavior that React exposes for form components such as `<input>`:

- `<input value='Controlled' />` and `<input value='' />` will have a controlled value
- `<input />` and `<input defaultValue='Initial value, before user interaction' />` will have an uncontrolled value

**Uncontrolled** is a generic interface however, and allows you to modify all kind of properties to behave in this way (**TODO**: which)

```javascript

```

## Deprecated decorator

**TODO** what does it do?

```javascript
type Url = string

type Deprecated = (options: { readMore: ?Url, useInstead: ?string, name: ?string }) => (component: ReactComponent) => ReactComponent
```

```javascript
import React from 'react'
import {deprecated} from '@klarna/higher-order-components'

function OldUnderlined ({ … }) {
  …
}

export default deprecated({
  readMore: 'http://example.com/why-old-component-is-deprecated',
  useInstead: 'Underlined'
})(OldUnderlined)
```

If the component doesn’t have a defined `name` or `displayName`, you can specify its name like:

```javascript
deprecated({
  …,
  name: 'OldUnderlined'
})
```

## License

See [LICENSE](LICENSE)

MIT License
