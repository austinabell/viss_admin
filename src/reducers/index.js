import { combineReducers } from "redux";
import { TOGGLE_THEME, DARK, LIGHT } from "../actions/types";
import { tasks } from "./tasks";

const config = function(state = { theme: LIGHT }, action = null) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === LIGHT ? DARK : LIGHT
      };
    default:
      return state;
  }
};

/**
 * exports all redux reducers for store
 */
export default combineReducers({
  config,
  tasks
});
