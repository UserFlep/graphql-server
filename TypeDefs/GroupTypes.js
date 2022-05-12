import {gql} from "apollo-server-express"

export default gql`
    type Group {
        id: ID!
        name: String!
    }

    type GroupPayload {
        recordId: ID
        record: Group!
        query: Query!
    }
    
    input CreateGroupInput {
        name: String!
    }
    
    input UpdateGroupInput {
        id: ID!
        name: String!
    }
    
    extend type Query {
        group(id: ID): Group!
        groups: [Group!]!
    }

    extend type Mutation {
        groupCreate(input: [CreateGroupInput!]!): [GroupPayload!]!
        groupUpdate(input: [UpdateGroupInput!]!): [GroupPayload!]!
        groupDelete(id: [ID!]!): Int!
    }
`;
