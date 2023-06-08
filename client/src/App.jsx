import './App.css'

import { useState } from 'react'
import {Routes , Route , useLocation , useNavigate} from 'react-router-dom'

import LandingPage from './components/landingPage'
import HomePage from './components/homePage'
import DetailPage from './components/detaiPage'
import NavBar from './components/navBar'

function App() {
  
  const {pathname} = useLocation()

  return (
    <div>

      {pathname!=='/' ? <NavBar/>:''}

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/details/:id' element={<DetailPage/>}/>
      </Routes>

    </div>
  )
}

export default App
