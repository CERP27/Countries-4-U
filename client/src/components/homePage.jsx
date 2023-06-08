import { useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCountries, getCountryById, orderByAtoZ, orderByPopulation } from '../redux/countrySlice';
import CountryCard from './countryCard'
const HomePage = ()=>{

    const URL = 'http://localhost:3001/countries'

    const dispatch = useDispatch()

    const allcountries = useSelector(state=>state.country.countries)

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

    const [aux,setAux] = useState(false)
    
    
    if(!allcountries.length) return <h1>Loading</h1>
    
    const handleOrderByAtoZ = (event) =>{
        dispatch(orderByAtoZ(event.target.value))
        setAux(true)
    }
    
    const handleOrderByPopulation = (event)=>{
        dispatch(orderByPopulation(event.target.value))
        setAux(true)
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