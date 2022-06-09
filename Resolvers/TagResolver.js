export default {

    Query: {
        tag: async (parent, {id}, {Tag}) => await Tag.findByPk(id),
        tags: async (parent, args, {Tag}) => await Tag.findAll(),
    },

    Tag: {
        parent: async (parent, args, {Tag})=> await Tag.findOne({where: {id: parent.parentId}})
    },

    Mutation: {
        tagCreate: async (parent, {input}, {Tag}) => {
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
        tagUpdate: async (parent, {input}, {Tag}) => {
            const result = []
            for(const el of input){
                const [,updatedTag] = await Tag.update({name: el.name, parentId: el.parentId}, {where: {id: el.id}, include: Tag, returning: true, plain: true})
                result.push(updatedTag)
            }

            return result.map(updTag=>({
                recordId: updTag.id,
                record: updTag,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        tagDelete: async (parent, {id}, {Tag}) => await Tag.destroy({where: {id}}),
    },
};