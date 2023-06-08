import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    country:{},
    countries:[],
    allCountries:[],
    activity:{}
}

export const countrySlice = createSlice({
    name:"country",
    initialState,
    reducers:{
        getCountries: (state,{payload})=>{
            const data = payload;
            state.countries = data;
            state.allCountries = state.countries;
        },
        getCountryById: (state,{payload})=>{
            const data = payload;
            state.country = data;
        },
        orderByAtoZ:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.countries]
            state.countries = data ==='A'
            ? allCountriesCopy.sort((a,b) => a.name > b.name)
            : allCountriesCopy.sort((a,b)=> b.name > a.name)
            
        },
        orderByPopulation:(state,{payload})=>{
            const data = payload;
            const allCountriesCopy = [...state.countries]
            state.countries = data ==='A'
            ? allCountriesCopy.sort((a,b) => a.population - b.population)
            : allCountriesCopy.sort((a,b)=> b.population - a.population)
        }

    }
})


export const {getCountries, getCountryById, orderByAtoZ, orderByPopulation} = countrySlice.actions;
export default countrySlice.reducer;