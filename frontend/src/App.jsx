import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Acocount from './pages/Account'
import Navbar from './components/Navbar'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Acocount />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
