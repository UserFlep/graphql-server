export default {

    Query: {
        tag: async (parent, {id}, {Tag}) => await Tag.findByPk(id),
        tags: async (parent, args, {Tag}) => await Tag.findAll(),
    },

    //метод Tag.getTag() формируется sequelzie при установке ассоциации Tag и Tag и возвращает parent tag
    Tag: {
        parent: async parent => await parent.getTag()
    },

    Mutation: {
        addTag: async (parent, {input}, {Tag}) => {
            const createdTags = await Tag.bulkCreate(
                input.map(el => ({ name: el.name, parentId: el.parentId }))
            )
            return createdTags.map(createdTag=>({
                recordId: createdTag.id,
                record: createdTag,
                query: {}
            }))
        },

        //Update возвращает 2 элемента, 1 - количество затронутых строк, 2 - сами затронутые строки
        updateTag: async (parent, {input}, {Tag}) => {
            const result = []
            for(const el of input){
                const [,updatedTag] = await Tag.update({name: el.name, parentId: el.parentId}, {where: {id: el.id}, returning: true, plain: true})
                result.push(updatedTag)
            }

            return result.map(updTag=>({
                recordId: updTag.id,
                record: updTag,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        removeTag: async (parent, {id}, {Tag}) => await Tag.destroy({where: {id}}),
    },
};