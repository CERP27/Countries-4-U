import { useParams, Link } from "react-router-dom"
import { useState } from "react";

const SearchBar = ()=>{
    const [search,setSearch] = useState('')

    const handleChange = (e) =>{
        setSearch(e.target.value)
     }
     console.log(search)
    return (
        <div>
            <div>
                <input placeholder="Enter a country's name"  id="input-field" type='search' value={search} onChange={handleChange} />
                <button>🔎</button>
            </div>
        </div>
    )
}

export default SearchBar