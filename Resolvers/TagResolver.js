export default {

    Query: {
        getTags: async (parent, args, {Tag, Group}) => Tag.findAll({
            include: {
                model: Group
            }
        }),

        getTag: async (parent, {id}, {Tag, Group}) => await Tag.findByPk(id, {
            include: {
                model: Group
            }
        }),
    },

    Mutation: {
        createTag: async (parent, {input}, {Tag}) => await Tag.create({
            name: input.name,
            groupId: input.groupId
        }),

        //Update возвращает 2 элемента, 1 - количество затронутых строк, 2 - сами затронутые строки
        updateTag: async (parent, {id, input}, {Tag}) => await Tag.findByPk(id)
            .then(async tag => await tag.update({
                name: input.name,
                groupId: input.groupId
            })),

        //Destroy возвращает число удаленных строк
        deleteTag: async (parent, {id}, {Tag}) => await Tag.destroy({
            where: {
                id: id
            }
        }),
    }
};