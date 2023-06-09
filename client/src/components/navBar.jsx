import { useLocation, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios'
import {getCountries, orderByAtoZ, orderByPopulation, filterByContinent} from '../redux/countrySlice'

import SearchBar from "./searchBar";

const NavBar = ()=>{
    const {pathname} = useLocation()

    const dispatch = useDispatch()

    const URL = 'http://localhost:3001/countries'

    
    const getallCountries= async()=>{
        try {
            const {data} = await axios(URL)
            
            dispatch(getCountries(data))
        } catch (error) {
            throw error.message
        }
    }
    const handleOrderByAtoZ = (event) =>{
        dispatch(orderByAtoZ(event.target.value))
    }
    
    const handleOrderByPopulation = (event)=>{
        dispatch(orderByPopulation(event.target.value))
    }

    const handleFilterbyContinent = (event)=>{
        event.target.value!=='All' ? dispatch(filterByContinent(event.target.value))
        :getallCountries()
    }

    return (
        <div>
            <Link to='/home'>
                <button onClick={()=>getallCountries()}>🏠</button>
            </Link>

            <Link to='/activity'>
                <button>Activity</button>
            </Link>

            <div>
            {pathname==='/home' ? <SearchBar/> : null}
            </div>

            {
                pathname==='/home'?
                <div>
                <select name="alphabetical" onChange={handleOrderByAtoZ}>
                <option selected disabled>Alphabetical Order:</option>
                <option value="A">From A to Z</option>
                <option value="D">From Z to A</option>
                </select>
                </div> : null
            }

            {
                pathname==='/home'?
                <div>
                <select name= "population" onChange={handleOrderByPopulation}>
                <option selected disabled>Population Order:</option>
                <option value="A">Population ↑ </option>
                <option value="D">Population ↓</option>
                </select>
                </div> : null
            }       
           

            {
                pathname==='/home'?
                <div>
                <select name= "continents" onChange={handleFilterbyContinent}>
                <option selected disabled>Filter by Country:</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Antarctica">Antarctica</option>
                <option value="All">World</option>
                </select>
                </div> : null
            }   
            
        </div>
    )
}

export default NavBar