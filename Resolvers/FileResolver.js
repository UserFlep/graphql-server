import exifr from 'exifr'
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
            const crtFiles = await File.bulkCreate(
                filesData.map(fileData => ({
                    url: fileData.url,
                    mimetype: fileData.mimetype
                }))
            )
            return crtFiles.map(crtFile=>({
                recordId: crtFile.id,
                record: crtFile,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        fileDelete: async (parent, {id}, {File}) => await File.destroy({where: {id}}),
    },
};