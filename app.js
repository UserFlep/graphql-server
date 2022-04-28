import express from "express";
import cors from "cors";
import {graphqlUploadExpress} from "graphql-upload/public/index.mjs";

const app = express();

app.use(express.json());
app.use(cors());
app.use(graphqlUploadExpress())

export default app;