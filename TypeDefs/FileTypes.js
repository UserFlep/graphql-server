import {gql} from "apollo-server-express"

export default gql`
    type File {
        id: ID
        url: String
        mimetype: String
    }

    type FullFile {
        id: ID
        url: String
        mimetype: String
        tags: [FullTag]
    }
    
    extend type Query {
        getFiles: [FullFile]
        getFile(id: ID): FullFile
    }

    extend type Mutation {
        createFile(file: Upload!): File
        createFiles(files: [Upload]!): [File]
        deleteFile(id: ID): Boolean
    }
`;