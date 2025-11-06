import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Order from './Order'
import Contact from './Contact'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
