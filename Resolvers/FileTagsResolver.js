export default {

    Query: {
        getFileTags: async (parent, {fileId}, {FileTag, Tag}) => await FileTag.findAll(
            {
                where: {
                    fileId: fileId
                }
            },
            {
                include: {
                    model: Tag
                }
            }
        ),
    },

    Mutation: {
        createFileTags: async (parent, {input}, {FileTag}) => await FileTag.bulkCreate(
            input.tagId.map(tagId=> ({
                fileId: input.fileId,
                tagId: tagId
            }))
        ),

        //Destroy возвращает число удаленных строк
        deleteFileTags: async (parent, {fileId}, {FileTag}) => await FileTag.destroy({
            where: {
                fileId: fileId
            }
        }),
    }
};