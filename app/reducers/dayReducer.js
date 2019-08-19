import type { Action } from './types';

import { GET_DAY, SET_DAY, SET_PAGE } from "../actions/types";

const initialState = {
    dayPrices: 0,
    currentDay: "Monday",
    currentPage: "HomePage"
}

export const dayReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case GET_DAY:
            return {
                ...state,
                dayPrices: action.payload
            }
        case SET_DAY:
            return {
                ...state,
                currentDay: action.payload
            }
        case SET_PAGE: 
            return {
                ...state,
                currentPage: action.payload
            }
        default: 
            return state;
    }
}