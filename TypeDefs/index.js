import {gql} from "apollo-server-express"
import tagTypes from "./TagTypes.js"
import fileTypes from "./FileTypes.js"
import fileTagsTypes from "./FileTagsTypes.js";

const typeDefs = gql`
    scalar Upload
    
    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;


export default [
    typeDefs,
    tagTypes,
    fileTypes,
    fileTagsTypes
]