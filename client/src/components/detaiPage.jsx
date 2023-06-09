import { useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCountries, getCountryById } from '../redux/countrySlice';
import { useParams, Link } from "react-router-dom"


const DetailPage = ()=>{

    const {id} = useParams()

    const URL = 'http://localhost:3001/countries'
    
    const dispatch = useDispatch()

    let country =''

    useEffect(()=>{
        const getCountryId = async()=>{
            try {
                const {data} = await axios(`${URL}/${id}`)
                dispatch(getCountryById(data))
            } catch (error) {
                throw error.message
            }
        }
        getCountryId()
    },[])
    
    country = useSelector(state=>state.country.country)
    
    
    if(!country) return <h1>Loading</h1>
    return (
        
        <div>
            
            <h1>{`${country.name} ( ${country.id} )`}</h1>
            <h2>{`Area: ${country.area} Km²`}</h2>
            <h2>{`Population: ${country.population}`}</h2>
            <h2>{`Continent: ${country.continents}`}</h2>
            <h2>{`Sub Region: ${country.subregion}`}</h2>
            <h2>{`Capital: ${country.capital}`}</h2>
            <img src={country.flags} alt={country.name} /><br/>
            
        </div>
    )
}


export default DetailPage