import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';

import {getCountryByName} from '../redux/countrySlice'
import style from './searchBar.module.css'

const SearchBar = ()=>{
    const URL = 'http://localhost:3001/countries'

    const dispatch = useDispatch();

    const [search,setSearch] = useState('')

    const [error,setError] = useState('')

    const handleChange = (e) =>{
    
        if(/^[a-zA-Z\s]*$/.test(e.target.value)){
            setSearch(e.target.value.trim())
        }
    }

    useEffect(()=>{
        setError('')
        const handleSearch = async()=>{
            try {
                const {data} = await axios(`${URL}?name=${search}`)
                dispatch(getCountryByName(data))
                
            } catch (error) {
                setError(error.message)
            }
        }

        handleSearch() 
    },[search])

    return (
        <div>
            <div className={style.search}>
                <input placeholder="Enter a country's name"  id="input-field" type='search' value={search} onChange={handleChange} className={style.searchInput}/>
                {
                    error && <p>This name does not match with any country</p>
                }
            </div>
        </div>
    )
}

export default SearchBar