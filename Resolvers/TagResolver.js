export default {

    Query: {
        tag: async (parent, {id}, {Tag}) => await Tag.findByPk(id, {
            include: {
                model: Tag
            }
        }),
        tags: async (parent, args, {Tag}) => Tag.findAll({
            include: {
                model: Tag
            }
        }),
    },

    Mutation: {
        tagCreate: async (parent, {input}, {Tag}) => {
            const createdTags = await Tag.bulkCreate(
                input.map(el => ({ name: el.name, parentId: el.parentId }))
            )
            console.log("=============================",JSON.stringify(createdTags))
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
                const [,updatedTag] = await Tag.update({name: el.name, parentId: el.parentId}, {where: {id: el.id}, include: {model: Tag}, returning: true, plain: true})
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