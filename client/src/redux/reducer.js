import { FILTERBYACTIVITY, FILTERBYCONTINENT, GETCOUNTRYBYID, GETCOUNTRYBYNAME, GET_ALLCOUNTRIES, ORDENBYASCDSC, ORDENBYPOPULATION, POST_ALLACTIVITIES } from "./action-types"

const initialState={
    country:[],
    countries:[],
    allCountries:[],
    activities:[],
    allActivities:[],
}

const reducer = ( state = initialState , {type,payload})=>{
    switch (type){

        case GET_ALLCOUNTRIES:
            return{
                ...state,
                countries:payload,
                allCountries:payload
            }

        case POST_ALLACTIVITIES:
            return{
                ...state,
                activities:payload
            }

        case GETCOUNTRYBYID:
            return {
                ...state,
                country:payload
            }

        case GETCOUNTRYBYNAME:
            return {
                ...state,
                countries:payload
            }

        case ORDENBYASCDSC:
            const allCountriesCopy = [...state.allCountries]
            return {
                ...state,
                countries:
                payload ==='A'
                ? allCountriesCopy.sort((a,b)=> a.name - b.name)
                : allCountriesCopy.sort((a,b)=> b.name - a.name)
            }
        
        case ORDENBYPOPULATION:
            const populationCopy = [...state.allCountries]

            return {
                ...state,
                countries:
                payload === 'A'
                ? populationCopy.sort((a,b)=> a.population - b.population)
                : populationCopy.sort((a,b)=> b.population - a.population)
            }

        case FILTERBYCONTINENT:
            const allCountriesFilteredByContinent= state.allCountries.filter(country => country.continent === payload)
            
            return {
                ...state,
                countries:
                payload === 'World'
                ?[...state.allCountries]
                :allCountriesFilteredByContinent
            }

        case FILTERBYACTIVITY:
            const allCountriesFilteredByActivity = state.allActivities.filter(activity=> activity.countries)

        default:return {...state}
    }
}

export default reducer