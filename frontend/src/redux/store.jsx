import {configureStore} from '@reduxjs/toolkit'
import authUserReducer from './userSlice'
const store = configureStore({
    reducer:{
        authUser:authUserReducer
    }
})

export default store