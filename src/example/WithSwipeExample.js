import React from 'react'
import { render } from 'react-dom'
import { withSwipe } from '../'

const WithSwipe = withSwipe({ velocityThreshold: 0.2 })(function Swipable({ ...props }) {
  return (
    <article
      style={{ backgroundColor: 'grey', width: 100, height: 100, alignSelf: 'center' }}
      {...props}
    >
      <h1>withSwipe</h1>
    </article>
  )
})

render(
  <main
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
    }}
  >
    <WithSwipe
      onSwipeLeft={() => console.log('SWIPED_LEFT')}
      onSwipeRight={() => console.log('SWIPED_RIGHT')}
      onSwipeUp={() => console.log('SWIPED_UP')}
      onSwipeDown={() => console.log('SWIPED_DOWN')}
    />
  </main>,
  document.getElementById('root')
)
