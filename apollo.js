import {ApolloServer} from 'apollo-server-express';
import typeDefs from "./TypeDefs/index.js";
import resolvers from './Resolvers/index.js'
import models from "./db/models.js";

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ()=>models
});

export default apolloServer;