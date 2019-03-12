import { FETCH_TASKS, TASKS_RECEIVED, TASK_SELECTED } from "../actions/types";

export const taskData = function(
  state = { loading: false, tasks: [] },
  action
) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, loading: true };
    case TASKS_RECEIVED:
      return {
        ...state,
        loading: false,
        tasks: action.tasks
      };
    case TASK_SELECTED:
      return {
        ...state,
        selectedTask: action.selectedTask
      };
    default:
      return state;
  }
};
