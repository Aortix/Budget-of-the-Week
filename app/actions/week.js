import type { GetState, Dispatch } from '../reducers/types';

import { GET_BUDGET, SET_WEEK } from "./types";

import { getCurrentWeekID } from "./../database/purchaseFunctions";

export function getWeek() {
  return {
    type: GET_BUDGET
  };
}

export function setWeek() {
  return {
    type: SET_WEEK,
    payload: getCurrentWeekID()
  }
}