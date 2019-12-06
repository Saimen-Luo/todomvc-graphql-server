const graph = require('graphql')

const TodoModel = require('../mongodb/model')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = graph


// 创建todo类型
const todoType = new GraphQLObjectType({
    name: 'todo',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        completed: {type: GraphQLBoolean}
    })
})

// RootQuery
const query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        todos: {
            type: new GraphQLList(todoType),
            resolve(parent, args) {
                return TodoModel.find()
            }
        }
    }
})

// Mutation
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTodo: {
            type: todoType,
            args: {
                title: {type: GraphQLString},
                completed: {type: GraphQLBoolean}
            },
            resolve(parent, args) {
                return TodoModel.create({
                    title: args.title,
                    completed: args.completed
                })
            }
        }
    }

})
module.exports = new GraphQLSchema({
    query,
    mutation
})