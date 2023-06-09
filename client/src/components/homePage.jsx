import { useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCountries, orderByAtoZ, orderByPopulation, filterByContinent } from '../redux/countrySlice';
import CountryCard from './countryCard'

const HomePage = ()=>{

    const URL = 'http://localhost:3001/countries'

    const dispatch = useDispatch()

    const allcountries = useSelector(state=>state.country.allCountries)
   

    useEffect(()=>{

        const getallCountries= async()=>{
            try {
                const {data} = await axios(URL)
                dispatch(getCountries(data))
            } catch (error) {
                throw error.message
            }
        }
        getallCountries();
        
    },[])

    // const [aux,setAux] = useState(false)
    
    
    if(!allcountries.length) return <h1>Loading</h1>
    
    const handleOrderByAtoZ = (event) =>{
        dispatch(orderByAtoZ(event.target.value))
        // setAux(true)
    }
    
    const handleOrderByPopulation = (event)=>{
        dispatch(orderByPopulation(event.target.value))
        // setAux(true)
    }

    const handleFilterbyContinent = (event)=>{
        dispatch(filterByContinent(event.target.value))
    }
    
    return (
        <div>
            <h1>HomePage</h1>
            
            <div>
                <select name="alphabetical" onChange={handleOrderByAtoZ}>
                <option value="A">A - Z</option>
                <option value="D">Z - A</option>
                </select>
            </div>

            <div>
                <select name= "population" onChange={handleOrderByPopulation}>
                <option value="A">Population ↑ </option>
                <option value="D">Population ↓</option>
                </select>
            </div>

            <div>
                <select name= "continents" onChange={handleFilterbyContinent}>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="North America">North America</option>
                <option value="Antarctica">Antarctica</option>
                <option value="All">World</option>
                </select>
            </div>
            
            {
                allcountries.map(({id,name,continents,flags})=>{
                    return(
                        <>
                        <CountryCard
                            id={id}
                            key={id+' '+name}
                            name={name}
                            continents={continents}
                            flags={flags}
                            />
                        </>
                    )
                })
            }
        </div>
    )
}

export default HomePage