import {multipleReadFile, readFile} from "../Middlewares/file.js";

export default {

    Query: {
        getFiles: async (parent, args, {File, Tag, Group}) => await File.findAll({
            include: {
                model: Tag,
                include: {
                    model: Group
                }
            }
        }),

        getFile: async (parent, {id}, {File, Tag, Group}) => await File.findByPk(id, {
            include: {
                model: Tag,
                include: {
                    model: Group
                }
            }
        }),
    },

    Mutation: {
        createFile: async (parent, {file}, {File}) => {
            const fileData = await readFile(file);
            return await File.create({
                url: fileData.url,
                mimetype: fileData.mimetype
            })
        },

        createFiles: async (parent, {files}, {File}) => {
            const filesData = await multipleReadFile(files);
            return await File.bulkCreate(
                filesData.map(fileData => ({
                    url: fileData.url,
                    mimetype: fileData.mimetype
                }))
            )
        },

        //Destroy возвращает число удаленных строк
        deleteFile: async (parent, {id}, {File}) => await File.destroy({
            where: {
                id: id
            }
        }),
    },
};