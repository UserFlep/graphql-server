import {readFile, multipleReadFile} from "../Middlewares/file.js"

export default {

    Mutation: {
        singleUpload: async (parent, {file}, {File}) => {
            const imageUrl = await readFile(file);
            await File.create({
                name: imageUrl
            })
            return {
                message: "Single file uploaded successfully!"
            }
        },

        multipleUpload: async (parent, {file}, {File}) => {
            const imageUrls = await multipleReadFile(file);
            await File.bulkCreate(
                imageUrls.map(item=> ({
                    name: item.url
                }))
            )

            return {
                message: "Multiple File uploaded successfully!"
            }
        },

    }
};