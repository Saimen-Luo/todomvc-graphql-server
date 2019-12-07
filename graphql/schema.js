const graph = require('graphql')

const TodoModel = require('../mongodb/model')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLInt
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

// 创建updateResult类型
const updateResultType = new GraphQLObjectType({
    name: 'updateResult',
    fields: () => ({
        n: {type: GraphQLInt},
        nModified: {type: GraphQLInt},
        ok: {type: GraphQLInt}
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
        },
        toggleAllCompleted: {
            type: updateResultType,
            args: {
                completed: {type: GraphQLBoolean}
            },
            resolve(parent, args) {
                return TodoModel.updateMany({}, {
                    completed: args.completed
                })
            }
        },
        delTodo: {
            type: todoType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return TodoModel.findOneAndDelete({_id: args.id})
            }
        },
    }

})
module.exports = new GraphQLSchema({
    query,
    mutation
})