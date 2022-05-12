export default {

    Query: {
        tag: async (parent, {id}, {Tag, Group}) => await Tag.findByPk(id, {
            include: {
                model: Group
            }
        }),
        tags: async (parent, args, {Tag, Group}) => Tag.findAll({
            include: {
                model: Group
            }
        }),
    },

    Mutation: {
        tagCreate: async (parent, {input}, {Tag}) => {
            const crtTags = await Tag.bulkCreate(
                input.map(el => ({ name: el.name, groupId: el.groupId }))
            )
            return crtTags.map(crtTag=>({
                recordId: crtTag.id,
                record: crtTag,
                query: {}
            }))
        },

        //Update возвращает 2 элемента, 1 - количество затронутых строк, 2 - сами затронутые строки
        tagUpdate: async (parent, {input}, {Tag, Group}) => {
            const result = []
            for(const el of input){
                const [,updTag] = await Tag.update({name: el.name, groupId: el.groupId}, {where: {id: el.id}, include: {model: Group}, returning: true, plain: true})
                result.push(updTag)
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