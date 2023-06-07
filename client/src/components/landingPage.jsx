

import { useDispatch, useSelector} from 'react-redux';
import { getAllCountries } from '../redux/actions';
import { useState, useEffect } from 'react';
const LandingPage = ()=>{

    const [countries,setCountries] = useState([])

    const dispatch = useDispatch()

    const allcountries = useSelector(state=>state.allcountries)

    const handleGetCountries = async(event) =>{
       const allcountries = await dispatch(getAllCountries())
       setCountries([...countries, ...allcountries.payload])
    }
    
    console.log(countries)
    console.log(allcountries)

    return (
        
        <div>
            {countries ? <h1>{countries[0].name}</h1>:<h1>no data</h1>}
            <h1>LandingPage</h1>
            
            <button onClick={handleGetCountries}>getALLCountries</button>
        </div>
    )
}


export default LandingPage