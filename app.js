import express from "express";
import cors from "cors";
import {graphqlUploadExpress} from "graphql-upload";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("Upload"))
app.use(graphqlUploadExpress())

export default app;