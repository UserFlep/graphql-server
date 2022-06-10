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
    
    extend type Query {
        files: [File!]!
        file(id: ID!): File!
    }

    extend type Mutation {
        fileCreate(files: [Upload!]!): [FilePayload!]!
        fileDelete(id: [ID!]!): Int!
    }
`;