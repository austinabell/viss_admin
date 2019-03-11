import { FETCH_TASKS, TASKS_RECEIVED } from "../actions/types";

export const tasks = function(state = { loading: false, tasks: [] }, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, loading: true };
    case TASKS_RECEIVED:
      return {
        ...state,
        loading: false,
        tasks: action.tasks
      };
    default:
      return state;
  }
};
