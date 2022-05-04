import {gql} from "apollo-server-express"

export default gql`
    type File {
        id: ID
        name: String
    }

    type FullFile {
        id: ID
        name: String
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