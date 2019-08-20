import type { Action } from './types';

import { GET_DAY, SET_DAY, SET_PAGE, SET_DAY_FOR_PURCHASES } from "../actions/types";

import moment from "moment"

const initialState = {
    dayPrices: 0,
    currentDay: "Monday",
    currentPage: "HomePage",
    currentDayForPurchases: moment().format("dddd")
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
        case SET_DAY_FOR_PURCHASES: 
            return {
                ...state,
                currentDayForPurchases: action.payload
            }
        default: 
            return state;
    }
}