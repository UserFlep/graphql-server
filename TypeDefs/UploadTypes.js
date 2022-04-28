import {gql} from "apollo-server-express"

export default gql`
    type Message {
        message: String
    }
    
    extend type Mutation {
        singleUpload(file: Upload!): Message
        multipleUpload(file: [Upload]!): Message
    }
`;