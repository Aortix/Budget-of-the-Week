import type { Action } from './types';

import { SET_WEEK } from "../actions/types";

const initialState = {
    currentWeek: 0
}

export const weekReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case SET_WEEK: 
            return {
                ...state,
                currentWeek: action.payload
            }
        default: 
            return state;
    }
}