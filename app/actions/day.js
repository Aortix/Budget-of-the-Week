// @flow
import type { GetState, Dispatch } from '../reducers/types';

import { GET_DAY } from "./types";

import { getPurchasesOfDay } from "./../database/dayFunctions";
import sumUpPurchases from "./../utils/sumUpPurchases";

export const getDayPurchases = (day = "Monday", weekID = 0) => {
  return {
    type: GET_DAY,
    payload: sumUpPurchases(getPurchasesOfDay(day, weekID))
  };
}