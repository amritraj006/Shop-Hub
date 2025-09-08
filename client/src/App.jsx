import { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useAppContext } from './contexts/AppContext'
import Search from './components/Search'

import { Toaster } from 'sonner'
import ProductList from './pages/ProductList'
import Footer from './components/Footer'
import ProductDetails from './pages/ProductDetails'
import Cart from './components/Cart'


const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
  const { openSearch } = useAppContext();
  const { openCart, setOpenCart } = useAppContext();


  return (
    <div className='dark:bg-black relative'>
      <Toaster 
  position="top-center" 
  expand={false} 
  richColors 
  duration={1500} // 1.5 seconds
/>
      {/* Loading Animation */}
  
      {openSearch && <Search />}
      <Navbar theme={theme} setTheme={setTheme} />
      <Cart isOpen={openCart} onClose={() => setOpenCart(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetails />} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App