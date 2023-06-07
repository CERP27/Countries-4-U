import './App.css'

import { useState } from 'react'
import {Routes , Route , useLocation , useNavigate} from 'react-router-dom'

import LandingPage from './components/landingPage'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      </Routes>

    </>
  )
}

export default App
