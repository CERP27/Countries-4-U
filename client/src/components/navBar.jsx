import { useLocation, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios'

import {getCountries, orderByAtoZ, orderByPopulation, filterByContinent, filterByActivity} from '../redux/countrySlice'
import SearchBar from "./searchBar";
import style from './navBar.module.css'

const NavBar = ()=>{

    const activities = useSelector(state=>state.country.activities)

    const names = activities.map(activity=>{
        return activity.name
    })
    const setOfNames = new Set(names);
    const activitiesNames= Array.from(setOfNames)

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

    return (
        <div className={style.navBar}>
            <div className={style.buttons}>

            <Link to='/home'>
                <button  className={style.navBarbutton}>Home</button>
            </Link>
            
            </div>

            <div className={style.search}>
                {pathname==='/home' ? <SearchBar/> : null}
            </div>

            <div className={style.orders}>
                {
                    pathname==='/home'?
                    <div>
                        <select name="alphabetical" onChange={handleOrderByAtoZ}>
                        <option selected disabled>Alphabetical Order</option>
                        <option value="A">From A to Z</option>
                        <option value="D">From Z to A</option>
                        <option value="NOrder">No Order</option>
                        </select>
                    </div> : null
                }

                {
                    pathname==='/home'?
                    <div>
                        <select name= "population" onChange={handleOrderByPopulation}>
                        <option selected disabled>Population Order</option>
                        <option value="A">Population ↑</option>
                        <option value="D">Population ↓</option>
                        <option value="NOrder">No Order</option>
                        </select>
                    </div> : null
                } 
            </div>

            <div className={style.filter}>
                {
                    pathname==='/home'?
                    <div>
                        <select name= "continents" onChange={handleFilterbyContinent}>
                        <option selected disabled>Filter by Continent</option>
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
                        <option selected disabled>Filter by Activity</option>
                        {
                            activitiesNames.map((name)=>{
                                return <option  key={name} value={name}>{name.slice(0,1).toUpperCase()+name.slice(1)}</option>
                            })
                        }           
                         <option value="No Activity">No Activity</option>
                        </select>: null
                    }
                </div>    
            </div>

            {pathname !=='/activity'?
            <div className={style.activity}>
                <Link to='/activity'>
                    <button className={style.navBarbutton}>Create Activity</button>
                </Link>
            </div>:null
            } 
        </div>
    )
}

export default NavBar