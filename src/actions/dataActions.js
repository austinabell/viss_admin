import {
} from "./types";
import axios from "axios";

// const baseURL =
//   process.env.REACT_APP_API_HOST || `http://${window.location.hostname}:5000`;
// const instance = axios.create({ baseURL });
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

/**
 * Action gets all claims from database based on parameters
 */
// export function getClaims(searchBy, searchText, sortReverse) {
//   return function(dispatch) {
//     return instance
//       .get("/api/claims", {
//         params: { searchBy, searchText, sortReverse }
//       })
//       .then(
//         function(res) {
//           const payload = res.data;
//           dispatch({
//             type: GET_ALL_CLAIMS,
//             payload
//           });
//         },
//         function() {
//           const payload = { claims: [], hasMore: false };
//           dispatch({
//             type: GET_ALL_CLAIMS,
//             payload
//           });
//         }
//       );
//   };
// }

