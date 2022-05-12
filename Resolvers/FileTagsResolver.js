export default {

    Query: {
        fileTags: async (parent, {fileId}, {FileTag, Tag}) => await FileTag.findAll(
            {
                where: {
                    fileId
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
        fileTagsCreate: async (parent, {input}, {FileTag}) => {
            const allCrtFileTags = []
            for(const el of input){
                const crtFileTags = await FileTag.bulkCreate(
                    el.tagId.map(tagId=> ({
                        fileId: el.fileId,
                        tagId: tagId
                    }))
                )
                allCrtFileTags.push(crtFileTags)
            }

            return allCrtFileTags.map(crtFileTags => crtFileTags.map(fileTag=>({
                recordId: fileTag.id,
                record: fileTag,
                query: {}
            })))

        },

        // fileTagsCreate: async (parent, {input}, {FileTag}) => {
        //
        //     const crtFileTags = await FileTag.bulkCreate(
        //         input.tagId.map(tagId=> ({
        //             fileId: input.fileId,
        //             tagId: tagId
        //         }))
        //     )
        //     return crtFileTags.map(fileTag=>({
        //         recordId: fileTag.id,
        //         record: fileTag,
        //         query: {}
        //     }))
        // },

        //Destroy возвращает число удаленных строк
        fileTagsDelete: async (parent, {fileId}, {FileTag}) => await FileTag.destroy({where: {fileId}}),
    },
};