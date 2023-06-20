import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countries:[],
    allCountries:[],
    countriesForActivityOnly:[],
    country:{},
    activity:{},
    activities:[]
}

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        getCountries: (state,{payload})=>{
            const data = payload;
            state.countries = data;
            state.allCountries = data;
            state.countriesForActivityOnly = data;
        },
        getCountryById: (state,{payload})=>{
            const data = payload;
            state.country = data;
        },
        orderByAtoZ:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.allCountries]
            state.allCountries = data ==='A'
            ? allCountriesCopy.sort((a, b) => a.name.localeCompare(b.name))
            : data ==='D' ? allCountriesCopy.sort((a, b) => b.name.localeCompare(a.name))
            : state.countries 
        },
        orderByPopulation:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.allCountries]
            state.allCountries = data ==='A'
            ? allCountriesCopy.sort((a,b) => a.population - b.population)
            :data === 'D' ? allCountriesCopy.sort((a,b) => b.population - a.population)
            : state.countries
        },
        filterByContinent:(state,{payload})=>{
            const data = payload;
            const allCountriesFilteredContinent = state.countries.filter(country=>country.continents === data)
            state.allCountries = data === 'All'
            ? state.countries
            : allCountriesFilteredContinent
        },
        getCountryByName:(state,{payload})=>{
            const data = payload;
            state.countries = data;
            state.allCountries = data;
        },
        postActivity:(state,{payload})=>{
            const data = payload;
            state.activity = data;    
        },
        getActivities: (state,{payload})=>{
            const data = payload;
            state.activities = data;
        },
        filterByActivity:(state,{payload})=>{
            const data = payload
            const activitiesCopy = state.activities.filter(activity => activity.name === data)
            let countriesID = []
            activitiesCopy.map(activity=> activity.Countries.map(country=> countriesID.push(country.id)))
            const countriesFilteredByActivity = state.countries.filter(country=> countriesID.includes(country.id))
            state.allCountries = data === 'No Activity'
            ? state.countries
            : countriesFilteredByActivity
        }   

    }
})


export const {getCountries, getCountryById, getCountryByName,postActivity, orderByAtoZ, orderByPopulation, filterByContinent,getActivities,filterByActivity} = countrySlice.actions;
export default countrySlice.reducer;