import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.scss'

// NAV COMPONENTS
import Navbar from './components/nav/navbar/Navbar'
import Home from './pages/home/Home'
import Footer from './components/nav/footer/Footer'
// PAGES
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import SinglePage from './pages/singlepage/SinglePage'


const App = () => {

  return (
   <div className='App'>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/:id" element={<SinglePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
   </div>
  )
}

export default App
