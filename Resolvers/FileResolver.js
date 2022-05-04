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
            const fileUrl = await readFile(file);
            return await File.create({
                name: fileUrl
            })
        },

        createFiles: async (parent, {files}, {File}) => {
            const fileUrls = await multipleReadFile(files);
            return await File.bulkCreate(
                fileUrls.map(url=> ({
                    name: url
                }))
            )
        },

        //Destroy возвращает число удаленных строк
        deleteFile: async (parent, {id}, {File}) => await File.destroy({
            where: {
                id: id
            }
        }),
    }
};