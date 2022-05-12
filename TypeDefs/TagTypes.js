import {gql} from "apollo-server-express"

export default gql`
    type Tag {
        id: ID!
        name: String!
        group: Group
    }
    
    type TagPayload {
        recordId: ID!
        record: Tag!
        query: Query
    }
    
    input CreateTagInput {
        name: String!
        groupId: ID!
    }

    input UpdateTagInput {
        id: ID!
        name: String
        groupId: ID
    }

    extend type Query {
        tag(id: ID!): Tag!
        tags: [Tag!]!
    }

    extend type Mutation {
        tagCreate(input: [CreateTagInput!]!): [TagPayload!]!
        tagUpdate(input: [UpdateTagInput!]!): [TagPayload!]!
        tagDelete(id: [ID!]): Int!
    }

`;