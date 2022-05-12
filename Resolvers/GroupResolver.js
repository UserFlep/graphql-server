export default {

    Query: {
        groups: async (parent, args, {Group}) => Group.findAll(),
        group: async (parent, {id}, {Group}) => await Group.findByPk(id),
    },

    Mutation: {
        groupCreate: async (parent, {input}, {Group}) => {
            const crtGroups = await Group.bulkCreate(
                input.map(el => ({name: el.name}))
            )
            return crtGroups.map(crtGroup=>({
                recordId: crtGroup.id,
                record: crtGroup,
                query: {}
            }))
        },

        //Update возвращает 1 или 2 параметра, 1 - количество затронутых строк, 2 - сами затронутые строки
        groupUpdate: async (parent, {input}, {Group}) => {
            const result = []
            for(const el of input){
                const [,updGroup] = await Group.update({name: el.name}, {where: {id: el.id}, returning: true, plain: true})
                result.push(updGroup)
            }

            return result.map(updGroup=>({
                recordId: updGroup.id,
                record: updGroup,
                query: {}
            }))
        },

        //Destroy возвращает число удаленных строк
        groupDelete: async (parent, {id}, {Group}) => await Group.destroy({where: {id}}),
    },
};