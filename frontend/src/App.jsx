import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.scss'

// NAV COMPONENTS
import Navbar from './components/nav/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/nav/footer/Footer'


const App = () => {

  return (
   <div className='App'>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
   </div>
  )
}

export default App
