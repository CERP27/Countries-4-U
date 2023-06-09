import {  useSelector, useDispatch} from 'react-redux';
import { orderByAtoZ, orderByPopulation, filterByContinent } from '../redux/countrySlice';
import CountryCard from './countryCard'

const HomePage = ()=>{
    const dispatch = useDispatch()

    const allcountries = useSelector(state=>state.country.allCountries)
  
    if(allcountries.length === 0) return <h1>No Countries</h1>
    return (
        <div>
            <div>
            {
                allcountries.length===0 ? <h1>No Countries</h1> : ''
            }
            </div><br/>
            
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