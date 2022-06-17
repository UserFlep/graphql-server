import {gql} from "apollo-server-express"

export default gql`
    type Tag {
        id: ID!
        name: String!
        parentId: ID
        parent: Tag
    }
    
    type TagPayload {
        recordId: ID!
        record: Tag!
        query: Query
    }
    
    input CreateTagInput {
        name: String!
        parentId: ID
    }

    input UpdateTagInput {
        id: ID!
        name: String
        parentId: ID
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