import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    countries:[],
    allCountries:[],
    countriesForActivityOnly:[],
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
            state.countriesForActivityOnly=data;
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
            : allCountriesCopy.sort((a, b) => b.name.localeCompare(a.name))
            
        },
        orderByPopulation:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.allCountries]
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
        },
        getCountryByName:(state,{payload})=>{
            const data = payload;
            state.countries = data;
            state.allCountries=data
        }

    }
})


export const {getCountries, getCountryById, getCountryByName, orderByAtoZ, orderByPopulation, filterByContinent} = countrySlice.actions;
export default countrySlice.reducer;