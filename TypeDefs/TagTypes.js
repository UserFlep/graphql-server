import {gql} from "apollo-server-express"

export default gql`
    type Tag {
        id: ID!
        name: String!
    }

    type FullTag {
        id: ID!
        name: String!
        group: Group!
    }
    
    input TagInput {
        name: String!
        groupId: ID!
    }

    extend type Query {
        getTags: [FullTag!]!
        getTag(id: ID!): FullTag!
    }

    extend type Mutation {
        createTag(input: TagInput!): Tag
        updateTag(id: ID!, input: TagInput!): Tag
        deleteTag(id: ID!): Boolean
    }
`;