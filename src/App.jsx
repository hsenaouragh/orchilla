import Home from './pages/home'
import Courses from './pages/courses'
import PlacementTest from './pages/placementTest'

import Header from './components/layout/header'
import Footer from './components/layout/footer'

import { Routes, Route } from 'react-router-dom' 
import TestPage from './pages/testPage'
import OfferList from './components/layout/offerList'
import Cart from './pages/cart'
import Profile from './pages/profile'


function App() {
  return (
    <>
      <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/placement-test' element={<PlacementTest />} /> 
            <Route path='/test' element={<TestPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='profile' element={<Profile />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App