// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { budgetReducer } from "./budgetReducer";
import { dayReducer } from "./dayReducer";
import { purchasesReducer } from "./purchasesReducer";
import { weekReducer } from "./weekReducer";

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    budgetReducer,
    dayReducer,
    purchasesReducer,
    weekReducer
  });
}
