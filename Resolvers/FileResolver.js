import {multipleReadFile} from "../Middlewares/file.js";
import {GraphQLUpload} from "graphql-upload";

export default {
    Upload: GraphQLUpload,

    Query: {
        files: async (parent, args, {File}) => await File.findAll(),
        file: async (parent, {id}, {File}) => await File.findByPk(id),
    },

    //метод File.getTags() формируется sequelzie при установке ассоциации File и Tag
    File: {
        tags: async parent => await parent.getTags()
    },

    Mutation: {

        fileCreate: async (parent, {input}, {File, FileTag}) => {
            //Извлекаем информация по upload файлам и загружаем их в локальное хранилище(папка Upload)
            const filesData = await multipleReadFile(input.files);
            //Добавляем файлы(информацию о них) в бд с помощью модели File
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

            //Получаем список опций для команды bulkCreate для добавления файловых тегов
            const addedFileTags = []
            for(const createdFile of createdFiles){
                for(const tagId of input.tagIds){
                    addedFileTags.push({
                        fileId: createdFile.id,
                        tagId: tagId,
                    })
                }
            }
            //Добавляем файловые теги
            await FileTag.bulkCreate(addedFileTags)

            //Добавленные теги сами вставлются в createdFile
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