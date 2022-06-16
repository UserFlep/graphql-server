import express from "express";
import cors from "cors";
import {graphqlUploadExpress} from "graphql-upload";
//import formidable from "formidable";

const app = express();

//////////////////////////////////////////////



// const fileMiddleware = (req, res, next) => {
//     if (!req.is('multipart/form-data')) {
//         return next();
//     }
//
//     const form = new formidable.IncomingForm({
//         uploadDir,
//         multiples: true,
//         keepExtensions: true
//     });
//
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             next(err);
//             return;
//         }
//         console.log("res;;;;;;;;;;;;;;;;;;;;;;",{ fields, files })
//         res.json({ fields, files });
//     });

    // form.parse(req, (error, fields, files) => {
    //
    //     console.log("-------fields---------",JSON.stringify(fields))
    //     console.log("---------files-------",JSON.stringify(files))
    //
    //     if (error) {
    //         console.log(error);
    //     }
    //
    //     const document = JSON.parse(fields.operations);
    //
    //     if (Object.keys(files).length) {
    //         const { file: { type, path: filePath } } = files;
    //         console.log(type);
    //         console.log(filePath);
    //         document.variables.file = {
    //             type,
    //             path: filePath,
    //         };
    //     }
    //
    //     req.body = document;
    //     next();
    // });
// };
//////////////////////////////////////////////
//app.use(fileMiddleware),
app.use(express.json());
app.use(cors());
app.use(express.static("Upload"))
app.use(graphqlUploadExpress())

export default app;