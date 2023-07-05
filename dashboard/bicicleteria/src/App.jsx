import { useState } from 'react'
import './App.css'
import Productos from './Components/Productos'
import Usuarios from './Components/Usuarios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Bicicleteria Gravity Bikes</h1>
      <Productos/>
      
      <Usuarios/>
      
    </>
  )
}

export default App
