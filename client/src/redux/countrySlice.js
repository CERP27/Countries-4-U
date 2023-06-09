import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCountries:[],
    countries:[],
    country:{},
    activity:{}
}

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        getCountries: (state,{payload})=>{
            const data = payload;
            state.countries = data;
            state.allCountries = data;
        },
        getCountryById: (state,{payload})=>{
            const data = payload;
            state.country = data;
        },
        orderByAtoZ:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.countries]
            state.allCountries = data ==='A'
            ? allCountriesCopy.sort((a, b) => a.name.localeCompare(b.name))
            : allCountriesCopy.sort((a, b) => b.name.localeCompare(a.name))
            
        },
        orderByPopulation:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.countries]
            state.allCountries = data ==='A'
            ? allCountriesCopy.sort((a,b) => a.population - b.population)
            : allCountriesCopy.sort((a,b)=> b.population - a.population)
        },
        filterByContinent:(state,{payload})=>{
            const data = payload;
            const allCountriesFilteredContinent = state.countries.filter(country=>country.continents === data)
            state.allCountries = data === 'All'
            ? state.countries
            :allCountriesFilteredContinent
        }

    }
})


export const {getCountries, getCountryById, orderByAtoZ, orderByPopulation, filterByContinent} = countrySlice.actions;
export default countrySlice.reducer;