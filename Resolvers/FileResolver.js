export default {

    Query: {
        getFiles: async (parent, args, {File, Tag, Group}) => await File.findAll({
            include: {
                model: Tag,
                include: {
                    model: Group
                }
            }
        }),

        getFile: async (parent, {id}, {File, Tag, Group}) => await File.findByPk(id, {
            include: {
                model: Tag,
                include: {
                    model: Group
                }
            }
        }),
    },

    Mutation: {
        createFile: async (parent, {input}, {File}) => await File.create({
                name: input.name
        }),

        //Update возвращает 2 элемента, 1 - количество затронутых строк, 2 - сами затронутые строки
        updateFile: async (parent, {id, input}, {File}) => await File.findByPk(id)
            .then(async file => await file.update({
                    name: input.name
            })),

        //Destroy возвращает число удаленных строк
        deleteFile: async (parent, {id}, {File}) => await File.destroy({
            where: {
                id: id
            }
        }),
    }
};