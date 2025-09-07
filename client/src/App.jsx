import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useAppContext } from './contexts/AppContext'
import Search from './components/Search'

import { Toaster } from 'react-hot-toast';
import ProductList from './pages/ProductList'
import Footer from './components/Footer'

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const { openSearch } = useAppContext();


  return (
    <div className='dark:bg-black relative'>
      <Toaster 
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#363636',
      color: '#fff',
    },
  }}
/>
      {/* Loading Animation */}
  

     
      {openSearch && <Search />}
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<ProductList />} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App