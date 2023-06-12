import './App.css'

import { useState, useEffect } from 'react'
import {Routes , Route , useLocation , useNavigate} from 'react-router-dom'
import { getCountries, getActivities } from './redux/countrySlice';
import { useSelector, useDispatch } from 'react-redux'

import LandingPage from './components/landingPage'
import HomePage from './components/homePage'
import DetailPage from './components/detaiPage'
import NavBar from './components/navBar'
import ActivityForm from './components/activityForm'
import axios from 'axios'
function App() {
  
  const {pathname} = useLocation()

  const dispatch = useDispatch()

  const URL = 'http://localhost:3001/countries'

  const URLA = 'http://localhost:3001/activities'

  useEffect(()=>{
    const getallCountries= async()=>{
        try {
          const {data} = await axios(URL)
          dispatch(getCountries(data))
    
          const res= await axios(URLA)
          dispatch(getActivities(res.data))
            
        }catch (error) {
          throw error.message
        }
    }
    getallCountries();

  },[])

  return (
    <div>

      {pathname!=='/' ? <NavBar/>:''}

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/details/:id' element={<DetailPage/>}/>
        <Route path='/activity' element={<ActivityForm/>}/>
      </Routes>

    </div>
  )
}

export default App
