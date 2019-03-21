import { TECHNICIAN_SELECTED } from "../actions/types";

export const technicianData = function(
  state = { loading: false, technicians: [] },
  action
) {
  switch (action.type) {
    case TECHNICIAN_SELECTED:
      return {
        ...state,
        selectedTechnicianId: action.selectedTechnicianId
      };
    default:
      return state;
  }
};
