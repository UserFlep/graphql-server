import 'dotenv/config'
import sequelize from "./db/db.js";
import app from "./app.js"
import http from 'http';
import {ApolloServer} from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import typeDefs from "./TypeDefs/index.js";
import resolvers from "./Resolvers/index.js";
import models from "./db/models.js";

import {schema} from "./Schema/ComposerTypes/index.js";

const PORT = process.env.PORT || 4000

const startApolloServer = async (schema)=>{

    const httpServer = http.createServer(app);

    const apolloServer = new ApolloServer({
        schema,
        context: async ()=>models,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await apolloServer.start()
    apolloServer.applyMiddleware({app});



    await new Promise(resolve => httpServer.listen(PORT, resolve))
        .then(async () => {
            // Подключаемся к нашей БД
            await sequelize.authenticate()
            await sequelize.sync()
            console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        })

}

await startApolloServer(schema)


