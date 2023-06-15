import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from 'axios';

import {getCountryByName} from '../redux/countrySlice'
import style from './searchBar.module.css'

const SearchBar = ()=>{
    const URL = 'http://localhost:3001/countries'

    const dispatch = useDispatch();

    const [search,setSearch] = useState('')

    const handleChange = (e) =>{
        if(/^[a-zA-Z\s]*$/.test(e.target.value)){ //this doesn't allows the target.value to be a number
            setSearch(e.target.value.trim())
        }
        
    }

    useEffect(()=>{
        
        const handleSearch = async()=>{
            const {data} = await axios(`${URL}?name=${search}`)
            dispatch(getCountryByName(data))
        }

        handleSearch() 
    },[search])

    return (
        <div>
            <div>
                <input placeholder="Enter a country's name"  id="input-field" type='search' value={search} onChange={handleChange} className={style.searchInput}/>
            </div>
        </div>
    )
}

export default SearchBar