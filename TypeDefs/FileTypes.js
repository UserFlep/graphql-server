import {gql} from "apollo-server-express"

export default gql`
    type File {
        id: ID!
        url: String!
        mimetype: String!
        type: String!
        subtype: String!
        imageSize: String
        fileSize: String!
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
        files: [File!]!
        file(id: ID!): File!
    }

    extend type Mutation {
        fileCreate(input: CreateFileInput!): [FilePayload!]!
        fileDelete(id: [ID!]!): Int!
    }

`;