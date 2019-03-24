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
    $phone: String
    $email: String
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
      phone: $phone
      email: $email
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
      phone
      email
      notes
      status
      technicians {
        id
        name
        email
      }
    }
  }
`;

const EDIT_TASK_MUTATION = gql`
  mutation(
    $id: ID!
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
    $phone: String
    $email: String
    $notes: String
    $technicians: [ID!]
  ) {
    updateTask(
      id: $id
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
      phone: $phone
      email: $email
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
      phone
      email
      status
      technicians {
        id
        name
        email
      }
    }
  }
`;

export { ADD_TASK_MUTATION, EDIT_TASK_MUTATION };
