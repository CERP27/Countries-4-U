import {configureStore} from '@reduxjs/toolkit'
import countryReducer from './countrySlice'

export const store = configureStore({
    reducer: {
        country:countryReducer
    }
})
