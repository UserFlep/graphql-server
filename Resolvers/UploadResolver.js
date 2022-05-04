import {readFile, multipleReadFile} from "../Middlewares/file.js"

export default {

    Mutation: {
        singleUpload: async (parent, {file}, {File}) => {
            const fileUrl = await readFile(file);
            await File.create({
                name: fileUrl
            })
            return {
                message: "Single file uploaded successfully!"
            }
        },

        multipleUpload: async (parent, {file}, {File}) => {
            const fileUrls = await multipleReadFile(file);
            await File.bulkCreate(
                fileUrls.map(url=> ({
                    name: url
                }))
            )

            return {
                message: "Multiple File uploaded successfully!"
            }
        },

    }
};