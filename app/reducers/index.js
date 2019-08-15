// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { budgetReducer } from "./budgetReducer";
import { dayReducer } from "./dayReducer";

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    budgetReducer,
    dayReducer
  });
}
