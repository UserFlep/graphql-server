import 'dotenv/config'
import sequelize from "./db/db.js";
import app from "./app.js"
import apolloServer from "./apollo.js";

const PORT = process.env.PORT || 4000

const startServer = async ()=>{
    try {
        await apolloServer.start()
        apolloServer.applyMiddleware({app});

        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`);
            console.log(`Graphql EndPoint Path: ${apolloServer.graphqlPath}`);
        })
    }
    catch (e){
        console.log(e)
    }
}
startServer()


