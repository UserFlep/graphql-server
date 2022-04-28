import {gql} from "apollo-server-express"

export default gql`
    type Group {
        id: ID
        name: String
    }
    
    input GroupInput {
        name: String
    }

    extend type Query {
        getGroups: [Group]
        getGroup(id: ID): Group
    }

    extend type Mutation {
        createGroup(input: GroupInput): Group
        updateGroup(id: ID, input: GroupInput): Group
        deleteGroup(id: ID): Boolean
    }
`;
