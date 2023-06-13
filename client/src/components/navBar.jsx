import { useLocation, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import {getCountries, orderByAtoZ, orderByPopulation, filterByContinent, filterByActivity} from '../redux/countrySlice'

import SearchBar from "./searchBar";

const NavBar = ()=>{

    const activities = useSelector(state=>state.country.activities)
    
    // const [activities,setActivities] = useState([])

    const names = activities.map(activity=>{
        return activity.name
    })
    const allactivitiesnames = new Set(names);
    const activitiesNames= Array.from(allactivitiesnames)

    // useEffect(()=>{
    //     const getActivities = async()=>{
    //         const {data} = await axios(URLA)
    //         setActivities(data)
    //     }
    //     getActivities()
    // },[])

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

    const handleFilterbyActivity = (event)=>{
        event.target.value!=='No Activity' ? dispatch(filterByActivity(event.target.value))
        :getallCountries()
    }

    // const handlegetActivities = async(event)=>{
    //     const {data} = await axios(URLA)
    //     console.log(data)
    // }

    return (
        <div>
            <Link to='/home'>
                <button onClick={()=>getallCountries()}>Home</button>
            </Link>

            <Link to='/activity'>
                <button>Create Activity</button>
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
            

            
                <div>
                    {
                        pathname==='/home' && activitiesNames.length>0 ? 
                        <select name="activities" onChange={handleFilterbyActivity}>
                        <option selected disabled>Filter by Activity:</option>
                        {
                            activitiesNames.map((name)=>{
                                return <option value={name}>{name}</option>
                            })
                        }           
                         <option value="No Activity">No Activity</option>
                        </select>: null
                    }
                </div>
                
            
            
        </div>
    )
}

export default NavBar