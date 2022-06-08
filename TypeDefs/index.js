import {gql} from "apollo-server-express"
// import groupTypes from './GroupTypes.js'
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
    // groupTypes,
    tagTypes,
    fileTypes,
    fileTagsTypes]