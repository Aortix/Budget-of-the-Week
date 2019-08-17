import type { Action } from './types';

import { ADDING_PURCHASES_SWITCH, ADDED_PURCHASE } from "../actions/types";

const initialState = {
    addingPurchasesSwitch: false,
    addedPurchase: false
}

export const purchasesReducer = (state = initialState, action: Action) => {
    switch(action.type) {
        case ADDING_PURCHASES_SWITCH:
            return {
                ...state,
                addingPurchasesSwitch: !state.addingPurchasesSwitch
            }
        case ADDED_PURCHASE:
            return {
                ...state,
                addedPurchase: !state.addedPurchase
            }
        default:
            return state;
    }
}