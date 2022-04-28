import 'dotenv/config'
import sequelize from "./db/db.js";
import {graphqlUploadExpress} from "graphql-upload"
import express from "express";
import cors from "cors";
const app = express();

import apolloServer from "./apollo.js";

const PORT = process.env.PORT || 4000

const startServer = async ()=>{
        await apolloServer.start().then(()=>console.log("apolloServer.start"));
        app.use(express.json());
        app.use(cors());
        app.use(graphqlUploadExpress())
        apolloServer.applyMiddleware({app});

        await sequelize.authenticate().then(()=>console.log("sequelize.authenticate()"));
        await sequelize.sync().then(()=>console.log("sequelize.sync()"));

        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
            console.log(`Graphql EndPoint Path: ${apolloServer.graphqlPath}`);
        })
}
startServer()


