import type { Action } from './types';

import { GET_DAY, SET_DAY } from "../actions/types";

const initialState = {
    dayPrices: 0,
    currentDay: "Monday"
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
        default: 
            return state;
    }
}