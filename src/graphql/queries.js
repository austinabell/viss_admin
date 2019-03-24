import gql from "graphql-tag";

const GET_TASKS = gql`
  {
    allTasks {
      id
      name
      address
      city
      province
      duration
      windowStart
      windowEnd
      isAllDay
      status
      lat
      lng
      technicians {
        id
        name
        email
      }
    }
  }
`;

const GET_TECHNICIAN_TASKS = gql`
  query userTasks($id: ID!) {
    userTasks(id: $id) {
      id
      name
      address
      city
      province
      duration
      windowStart
      windowEnd
      isAllDay
      status
      lat
      lng
      technicians {
        id
        name
        email
      }
    }
  }
`;

export { GET_TASKS, GET_TECHNICIAN_TASKS };
