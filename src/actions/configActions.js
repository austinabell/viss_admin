import { TOGGLE_THEME } from "./types";

export function toggleTheme() {
  return function(dispatch) {
    dispatch({
      type: TOGGLE_THEME
    });
  };
}
