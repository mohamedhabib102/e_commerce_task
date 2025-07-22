import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './Components/Navbar';
import ProductDetails from './Components/ProductDetails';
import Cart from './pages/Cart';
import PaymentMethod from './Components/PaymentMethod';




function App() {

  return (

    <>
    <main className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/cart/payemnt' element={<PaymentMethod />}/>
      </Routes>
    </main>
    </>

  )
}

export default App
