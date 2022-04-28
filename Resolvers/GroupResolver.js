export default {

    Query: {
        getGroups: async (parent, args, {Group}) => Group.findAll(),

        getGroup: async (parent, {id}, {Group}) => await Group.findAll({
            where: {
                id: id
            }
        }),
    },

    Mutation: {
        createGroup: async (parent, {input}, {Group}) => await Group.create({
            name: input.name
        }),

        //Update возвращает 1 или 2 параметра, 1 - количество затронутых строк, 2 - сами затронутые строки
        updateGroup: async (parent, {id, input}, {Group}) => await Group.findByPk(id).
        then(async group => await group.update({
                name: input.name
        })),

        //Destroy возвращает число удаленных строк
        deleteGroup: async (parent, {id}, {Group}) => await Group.destroy({
            where: {id: id}
        }),
    }
};