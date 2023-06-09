import { useLocation, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import {getCountryByName} from '../redux/countrySlice'

const SearchBar = ()=>{
    const URL = 'http://localhost:3001/countries'

    const dispatch = useDispatch();

    const [search,setSearch] = useState('')

    const [error,setError] =useState('')

    const handleChange = (e) =>{
        setSearch(e.target.value)
        validate()
    }
    
    const validate = ()=>{
        let errorValidate

        if(search.length >0 && !isNaN(search)){
            errorValidate = 'The search must contain only words'
        }

        setError(errorValidate)
    }

    
    const handleSearch = async(name)=>{
        const {data} = await axios(`${URL}?name=${name}`)

        dispatch(getCountryByName(data))
        setSearch('')
    }

    useEffect(()=>{
        validate()   
    },[search])

    return (
        <div>
            <div>
                <input placeholder="Enter a country's name"  id="input-field" type='search' value={search} onChange={handleChange} />
                <button onClick={()=>{
                    if(!error){
                        handleSearch(search)
                    }
                    }}>🔎</button>
                {
                    error ? <p>{error}</p> : null
                }
            </div>
        </div>
    )
}

export default SearchBar