import { combineReducers } from "redux";
import { TOGGLE_THEME, DARK, LIGHT } from "../actions/types";
import { taskData } from "./tasks";
import { technicianData } from "./technicians";

const config = function(state = { theme: LIGHT }, action) {
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
  taskData,
  technicianData
});
