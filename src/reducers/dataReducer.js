import {} from "../actions/types";

const initialState = {};

export default function(state = initialState, action = null) {
  switch (action.type) {
    // case GET_ALL_CLAIMS:
    //   return {
    //     ...state,
    //     claims: action.payload.claims,
    //     unreviewedCount: action.payload.unreviewedCount,
    //     moreClaims: action.payload.hasMore,
    //     claimsReversed: "desc"
    //   };
    default:
      return state;
  }
}
