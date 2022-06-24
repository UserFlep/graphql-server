import {gql} from "apollo-server-express"

export default gql`
    type File {
        id: ID!
        url: String!
        mimetype: String!
        tags: [Tag]
    }
    
    type FilePayload {
        recordId: ID!
        record: File!
        query: Query
    } 
    input CreateFileInput {
        files: [Upload!]!
        tagIds: [String!]!
    }
    
    extend type Query {
        file(id: ID!): File!
        files: [File!]!
    }

    extend type Mutation {
        addFiles(input: CreateFileInput!): [FilePayload!]!
        removeFiles(id: [ID!]!): Int!
    }
`;