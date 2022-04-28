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
    
    input FileInput {
        name: String
    }

    extend type Query {
        getFiles: [FullFile]
        getFile(id: ID): FullFile
    }

    extend type Mutation {
        createFile(input: FileInput): File
        updateFile(id: ID, input: FileInput): File
        deleteFile(id: ID): Boolean
    }
`;