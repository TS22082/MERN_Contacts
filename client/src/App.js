import React from 'react'
import './App.css'
import MyComponent from './components/MyComponent'

function App() {
  let name = 'Thomas'
  return (
    <div className="App">
      <h1>Hello World</h1>
      <MyComponent name={name} />
    </div>
  )
}

export default App
