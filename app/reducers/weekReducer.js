import type { Action } from './types';

import { SET_WEEK, NEW_WEEK } from "../actions/types";

const initialState = {
    currentWeek: 0,
    newWeek: false
}

export const weekReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case SET_WEEK: 
            return {
                ...state,
                currentWeek: action.payload
            }
        case NEW_WEEK: 
            return {
                ...state,
                newWeek: true
            }
        default: 
            return state;
    }
}