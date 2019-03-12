import gql from "graphql-tag";

// placeholder
export const GET_TASKS_QUERY = gql`
  {
    me {
      id
      name
      username
      email
      isStarted
      currentLocation {
        lng
        lat
      }
    }
  }
`;
