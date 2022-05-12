import {schemaComposer} from 'graphql-compose';

//Creating Types
const GroupTC = schemaComposer.createObjectTC({
    name: 'Group',
    fields: {
        id: 'Int!',
        name: 'String',
    },
});

const TagTC = schemaComposer.createObjectTC({
    name: 'Tag',
    fields: {
        id: 'Int!',
        name: 'String',
        groupID: 'Int'
    },
});


//Create relations between Types
GroupTC.addFields({
    tags: {
        // Array of posts may be described as string in SDL in such way '[Post]'
        // But graphql-compose allow to use Type instance wrapped in array
        type: [TagTC],
        // for obtaining list of post we get current author.id
        // and scan and filter all Posts with desired authorId
        resolve: async ({groupId}, args, {Tag}) => await Tag.findAll({
            where: {
                groupId
            }
        })
    },
});

TagTC.addFields({
    group: {
        // you may provide the type name as a string (eg. 'Author'),
        // but for better developer experience you should use a Type instance `AuthorTC`.
        // This allows jumping to the type declaration via Ctrl+Click in your IDE
        type: GroupTC,
        // resolve method as first argument will receive data for some Post.
        // From this data you should then fetch Author's data.
        // let's take lodash `find` method, for searching by `authorId`
        // PS. `resolve` method may be async for fetching data from DB
        // resolve: async (source, args, context, info) => { return DB.find(); }
        resolve: async ({groupId}, args, {Group}) => await Group.findByPk(groupId)
    },
});

// Building Schema

// Requests which read data put into Query
schemaComposer.Query.addFields({
    tag: {
        type: 'Tag', //возвращаемое значение
        args: { id: 'Int!' },
        resolve: async (parent, {id}, {Tag}) => await Tag.findByPk(id),
    },
    tags: {
        type: '[Tag]', //возвращаемое значение
        resolve: async (parent, {id}, {Tag}) => await Tag.findAll(),
    },

    group: {
        type: 'Group',
        args: { id: 'Int!' },
        resolve: async (parent, {id}, {Group}) => await Group.findByPk(id),
    },
    groups: {
        type: '[Group]',
        resolve: async (parent, {id}, {Group}) => await Group.findAll(),
    },
});

export const schema = schemaComposer.buildSchema();


