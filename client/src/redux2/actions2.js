import { GETCOUNTRYBYID, GET_ALLCOUNTRIES, FILTERBYACTIVITY, FILTERBYCONTINENT, ORDENBYASCDSC, ORDENBYPOPULATION, DELETEACTIVITY, POST_ALLACTIVITIES, GETCOUNTRYBYNAME } from "./action-types";

import axios from 'axios'


export const getAllCountries = ()=>{
    const endpoint = `http://localhost:3001/countries`
    console.log('entre a getallcountries')
    return async(dispatch) =>{
        try {
            const {data} = await axios.get(endpoint)
            console.log(data)

            return dispatch({
                type:GET_ALLCOUNTRIES,
                payload:data
            })
        } catch (error) {
            throw error.message
        }
    }
}

export const getCountryById = (id) =>{
    const endpoint = `http:localhost:3001/countries/${id}`

    return async(dispatch) => {
        try {
            const {data} = await axios(endpoint)

            return dispatch({
                type:GETCOUNTRYBYID,
                payload:data
            })
        } catch (error) {
            throw error.message
        }
    }
}

export const getCountryByName = (name) =>{
    const endpoint = `http:localhost:3001/countries?name=${name}`

    return async(dispatch) =>{
        try {
            const {data} = await axios(endpoint)
            
            return dispatch({
                type:GETCOUNTRYBYNAME,
                payload:data
            })
        } catch (error) {
            throw error.message
        }
    }
}

export const postActivity = (activity) => {
    const endpoint = `http:localhost:3001/activities`

    return async(dispatch) => {
        try {
            const {data} = await axios.post(endpoint,activity)

            return dispatch({
                type:POST_ALLACTIVITIES,
                payload:data
            })
        } catch (error) {
            throw error.message
        }
    }
}


export const filterByActivity = (activity) => {
    return {
        type:FILTERBYACTIVITY,
        payload:activity
    }
}

export const filterByContinent = (continent) => {
    return {
        type:FILTERBYCONTINENT,
        payload:continent
    }
}

export const orderByAscDsc = (order) => {
    return {
        type:ORDENBYASCDSC,
        payload:order
    }
}

export const orderByPopulation = (population) => {
    return {
        type:ORDENBYPOPULATION,
        payload:population
    }
}