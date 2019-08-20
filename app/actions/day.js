// @flow
import type { GetState, Dispatch } from '../reducers/types';

import { GET_DAY, SET_DAY, SET_PAGE } from "./types";

import { getPurchasesOfDay } from "./../database/purchaseFunctions";
import sumUpPurchases from "./../utils/sumUpPurchases";

export const getDayPurchases = (day = "Monday", weekID = 0) => {
  return {
    type: GET_DAY,
    payload: sumUpPurchases(getPurchasesOfDay(day, weekID))
  };
}

export const setCurrentDay = (day = "Monday") => {
  return {
    type: SET_DAY,
    payload: day
  }
}

export const setCurrentPage = (page = "HomePage") => {
  return {
    type: SET_PAGE,
    payload: page
  }
}