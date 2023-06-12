import {  useSelector, useDispatch} from 'react-redux';
import { orderByAtoZ, orderByPopulation, filterByContinent } from '../redux/countrySlice';
import CountryCard from './countryCard'
import { useEffect, useState } from 'react';

const countriesPerPage = 10

const HomePage = ()=>{

    const allcountries = useSelector(state=>state.country.allCountries)

    const allactivities = useSelector(state=>state.country.activities)

    const [totalPages,setTotalPages] = useState(0)

    const [page,setPage] = useState(0)

    useEffect(()=>{
        setTotalPages(Math.floor(allcountries.length/countriesPerPage))
        setPage(0)
    },[allcountries])
    

  
    if(allcountries.length === 0) return <h1>No Countries</h1>
    return (
        <div>
            <div>
                
            {
            Array.from({length: totalPages}).map((f, i) => {
                return <button type="" onClick={() => setPage(i)}>{`${i+1}`}</button>
            })
            }
            
            </div>

            <div>
                {
                    allcountries.slice(0 + (page * countriesPerPage), countriesPerPage + (page * countriesPerPage)).map(({id,name,continents,flags})=>{
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
            
            
        </div>
    )
}

export default HomePage


// {
//     allcountries.map(({id,name,continents,flags})=>{
//         return(
//             <>
//             <CountryCard
//                 id={id}
//                 key={id+' '+name}
//                 name={name}
//                 continents={continents}
//                 flags={flags}
//                 />
//             </>
//         )
//     })
// }