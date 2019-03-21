import { TECHNICIAN_SELECTED } from "./types";

export function selectTechnician(technicianId) {
  return function(dispatch) {
    dispatch({ type: TECHNICIAN_SELECTED, selectedTechnicianId: technicianId });
  };
}
