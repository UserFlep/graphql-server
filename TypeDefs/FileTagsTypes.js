import {gql} from "apollo-server-express"

export default gql`
    type FileTag {
        id: ID!
        fileId: ID!
        tagId: ID!
    }

    input FileTagInput {
        fileId: ID!
        tagId: [ID!]!
    }

    type FileTagPayload {
        recordId: ID!
        record: FileTag!
        query: Query
    }
    
    extend type Query {
        fileTags(fileId: ID!): [FileTag!]!
    }

    extend type Mutation {
        fileTagsCreate(input: [FileTagInput!]!): [[FileTagPayload!]!]!
        fileTagsDelete(fileId: [ID!]): Int!
    }
`;