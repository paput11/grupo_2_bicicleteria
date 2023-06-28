import { useState } from 'react'
import './App.css'
import Productos from './Components/Productos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Bicicleteria Gravity Bikes</h1>
      <Productos/>
      
    </>
  )
}

export default App
