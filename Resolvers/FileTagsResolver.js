export default {

    Query: {
        fileTags: async (parent, {fileId}, {FileTag}) => await FileTag.findAll({where: {fileId}}),
    },

    Mutation: {
        fileTagsCreate: async (parent, {input}, {FileTag}) => {
            const crtFileTags = await FileTag.bulkCreate(
                input.tagId.map(tagId=> ({
                    fileId: input.fileId,
                    tagId: tagId
                }))
            )
            return crtFileTags.map(fileTag=>({
                recordId: fileTag.id,
                record: fileTag,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        fileTagsDelete: async (parent, {fileId}, {FileTag}) => await FileTag.destroy({where: {fileId}}),
    },
};