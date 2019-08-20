import type { GetState, Dispatch } from '../reducers/types';

import { ADDED_PURCHASE } from "./types";

import { addPurchaseToDay, updatePurchaseToDay, deletePurchaseToDay } from "./../database/purchaseFunctions";

export const addingPurchase = (itemInput, priceInput, day = "Monday", week = 0) =>
    dispatch => {
        addPurchaseToDay(itemInput, priceInput, day, week);
        //Set to true
        dispatch({ type: ADDED_PURCHASE })
        //Then set to false
        setTimeout(() => {
            dispatch({ type: ADDED_PURCHASE })
        }, 1000)
    }

export const updatingPurchase = (itemID, itemInput, priceInput, day = "Monday", week = 0) =>
    dispatch => {
        updatePurchaseToDay(itemID, itemInput, priceInput, day, week);
        //Set to true
        dispatch({ type: ADDED_PURCHASE })
        //Then set to false
        setTimeout(() => {
            dispatch({ type: ADDED_PURCHASE })
        }, 1000)
    }

export const deletingPurchase = (itemID, day = "Monday", week = 0) =>
    dispatch => {
        deletePurchaseToDay(itemID, day, week);
        //Set to true
        dispatch({ type: ADDED_PURCHASE })
        //Then set to false
        setTimeout(() => {
            dispatch({ type: ADDED_PURCHASE })
        }, 1000)
    }