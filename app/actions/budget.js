// @flow
import type { GetState, Dispatch } from '../reducers/types';

import { GET_BUDGET, SET_BUDGET } from "./types";

import { getBudgetFunction, setBudgetFunction } from "./../database/purchaseFunctions";

export function setBudget(budgetValue = 0, weekID = 0) {
  return {
    type: SET_BUDGET,
    payload: setBudgetFunction(budgetValue, weekID)
  };
}

export function getBudget(weekID = 0) {
  return {
    type: GET_BUDGET,
    payload: getBudgetFunction(weekID)
  };
}