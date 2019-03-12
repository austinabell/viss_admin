import { TASK_SELECTED } from "./types";
// import { ApolloClient } from "apollo-boost";
// import { GET_TASKS_QUERY } from "../graphql/queries/task";
// import { GraphQLClient } from "graphql-request";

// const endpoint =
//   process.env.REACT_APP_API_HOST || `http://${window.location.hostname}:5000`;
// const client = new GraphQLClient(endpoint, { headers: {} });

// export async function getTasks() {
//   return client.request(GET_TASKS_QUERY).then(function(res) {
//     return { type: FETCH_TASKS, tasks: res };
//   });
// }

export function selectTask(task) {
  return function(dispatch) {
    dispatch({ type: TASK_SELECTED, selectedTask: task });
  };
}
