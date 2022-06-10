import {multipleReadFile} from "../Middlewares/file.js";
import {GraphQLUpload} from "graphql-upload";

export default {
    Upload: GraphQLUpload,

    Query: {
        files: async (parent, args, {File, Tag}) => await File.findAll({include: Tag}),
        file: async (parent, {id}, {File, Tag}) => await File.findByPk(id, {include: Tag}),
    },

    Mutation: {
        fileCreate: async (parent, {files}, {File}) => {
            const filesData = await multipleReadFile(files);
            const createdFiles = await File.bulkCreate(
                filesData.map(fileData => ({
                    url: fileData.url,
                    mimetype: fileData.mimetype,
                    type: fileData.type,
                    subtype: fileData.subtype,
                    imageSize: fileData.imageSize,
                    fileSize: fileData.fileSize
                }))
            )
            return createdFiles.map(createdFile=>({
                recordId: createdFile.id,
                record: createdFile,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        fileDelete: async (parent, {id}, {File}) => await File.destroy({where: {id}}),
    },
};