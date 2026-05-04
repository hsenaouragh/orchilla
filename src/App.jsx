import Home from './pages/home'
import Courses from './pages/courses'
import PlacementTest from './pages/placementTest'

import Header from './components/layout/header'
import Footer from './components/layout/footer'

import { Routes, Route } from 'react-router-dom' 
import TestPage from './pages/testPage'
import OfferList from './components/layout/offerList'


function App() {
  return (
    <>
      <Header />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/courses' element={<Courses />} />
            <Route path='/placement-test' element={<PlacementTest />} /> 
            <Route path='/test' element={<TestPage />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App