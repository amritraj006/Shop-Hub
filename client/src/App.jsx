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
import AllCollections from './pages/AllCollections'
import SubCategory from './pages/SubCategory'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

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
        <Route path='/collections' element={<AllCollections />} />
        <Route path="/collections/:category" element={<SubCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App