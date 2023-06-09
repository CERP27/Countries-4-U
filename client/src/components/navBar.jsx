import { useLocation, Link } from "react-router-dom"
import { useState } from "react";
import { useDispatch } from 'react-redux';

// import {orderByAtoZ} from '../redux/countrySlice'

import SearchBar from "./searchBar";

const NavBar = ()=>{
    const {pathname} = useLocation()

    // const [aux,setAux] = useState(false)

    // const dispatch = useDispatch()

    // const handleOrderByAtoZ = (event) =>{
    //     dispatch(orderByAtoZ(event.target.value))
    //     setAux(true)
    // }

    return (
        <div>
            <Link to='/home'>
                <button>🏠</button>
            </Link>

            <div>
            {pathname==='/home' ? <SearchBar/> : null}
            </div>

            
            {/* {
                pathname==='/home' ? 
                <div>
                <select name="alphabetical" onChange={handleOrderByAtoZ}>
                <option value="A">A - Z</option>
                <option value="D">Z - A</option>
                </select></div>: null
            } */}
            
            
           

            {
                pathname==='/home'?
                <div>
                {/* <select name= "continents">
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Antarctica">Antarctica</option>
                <option value="All">World</option>
                </select> */}
                </div> : null
            }   
            
        </div>
    )
}

export default NavBar