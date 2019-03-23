import gql from "graphql-tag";

const ADD_TASK_MUTATION = gql`
  mutation(
    $name: String
    $address: String!
    $city: String!
    $province: String!
    $lat: Float
    $lng: Float
    $isAllDay: Boolean
    $windowStart: String
    $windowEnd: String
    $duration: Int!
    $notes: String
    $technicians: [ID!]
  ) {
    createTask(
      name: $name
      address: $address
      city: $city
      province: $province
      lat: $lat
      lng: $lng
      isAllDay: $isAllDay
      windowStart: $windowStart
      windowEnd: $windowEnd
      duration: $duration
      notes: $notes
      technicians: $technicians
    ) {
      id
      name
      address
      city
      province
      lat
      lng
      isAllDay
      windowStart
      windowEnd
      duration
      notes
      status
      technicians {
        name
        email
      }
    }
  }
`;

export { ADD_TASK_MUTATION };
