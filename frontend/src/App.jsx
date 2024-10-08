import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Acocount from './pages/Account'
import Navbar from './components/Navbar'

import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [count, setCount] = useState(0)
  function addToCart() {
    setCount(count + 1)
  }
  return (
    <>
      <BrowserRouter>
        <Navbar count={count}/>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} count={count}/>} />
          <Route path="/about" element={<Acocount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
