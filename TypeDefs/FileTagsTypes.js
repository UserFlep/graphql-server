import {gql} from "apollo-server-express"

export default gql`
    type FileTag {
        id: ID
        fileId: ID
        tagId: ID
    }

    input FileTagInput {
        fileId: ID
        tagId: [ID]
    }
    
    extend type Query {
        getFileTags(fileId: ID): [FileTag]
    }

    extend type Mutation {
        createFileTags(input: FileTagInput): [FileTag]
        deleteFileTags(fileId: ID): Int
    }
`;