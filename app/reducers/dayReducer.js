import type { Action } from './types';

import { GET_DAY } from "../actions/types";

const initialState = {
    dayPrices: 0
}

export const dayReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case GET_DAY:
        return {
            ...state,
            dayPrices: action.payload
        }
        default: 
        return state;
    }
}