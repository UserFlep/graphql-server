import {multipleReadFile} from "../Middlewares/file.js";
import {GraphQLUpload} from "graphql-upload";

export default {
    Upload: GraphQLUpload,

    Query: {
        file: async (parent, {id}, {File}) => await File.findByPk(id),
        files: async (parent, args, {File}) => await File.findAll(),
    },

    //метод File.getTags() формируется sequelzie при установке ассоциации File и Tag
    File: {
        tags: async parent => await parent.getTags()
    },

    Mutation: {

        addFiles: async (parent, {input}, {File, FileTag}) => {
            //Извлекаем информация по upload файлам и загружаем их в локальное хранилище(папка Upload)
            const filesData = await multipleReadFile(input.files);
            //Добавляем файлы(информацию о них) в бд с помощью модели File
            const createdFiles = await File.bulkCreate(
                filesData.map(fileData => ({
                    url: fileData.url,
                    mimetype: fileData.mimetype
                }))
            )

            //Получаем список опций для команды bulkCreate для добавления файловых тегов
            const addingFileTags = []
            for(const createdFile of createdFiles){
                for(const tagId of input.tagIds){
                    addingFileTags.push({
                        fileId: createdFile.id,
                        tagId: tagId,
                    })
                }
            }
            //Добавляем файловые теги
            await FileTag.bulkCreate(addingFileTags)

            //Добавленные теги сами вставлются в createdFile
            return createdFiles.map(createdFile=>({
                recordId: createdFile.id,
                record: createdFile,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        removeFiles: async (parent, {id}, {File}) => await File.destroy({where: {id}}),
    },
};