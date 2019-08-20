// @flow
import type { Action } from './types';

import { GET_BUDGET, SET_BUDGET } from "../actions/types";

const initialState = {
    budget: 0
}

export const budgetReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_BUDGET:
      return {
          ...state,
          budget: action.payload === 0 ? 1 : action.payload
      };
    case SET_BUDGET: 
      return {
          ...state,
          budget: action.payload === 0 ? 1 : action.payload
      }
    default:
      return state;
  }
}