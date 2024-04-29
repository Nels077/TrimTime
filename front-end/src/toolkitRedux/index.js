import {combineReducers,configureStore } from "@reduxjs/toolkit";
import sliceToolkit from "./sliceToolkit";


const rootReducer=combineReducers({
    toolkit: sliceToolkit
})

export const store =configureStore({
    reducer:rootReducer
})