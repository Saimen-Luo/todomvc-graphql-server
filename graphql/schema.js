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

// 创建deleteManyResult类型
const deleteManyResultType = new GraphQLObjectType({
    name: 'deleteManyResult',
    fields: () => ({
        n: {type: GraphQLInt},
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
        toggleCompleted: {
            type: updateResultType,
            args: {
                id: {type: GraphQLID},
                completed: {type: GraphQLBoolean}
            },
            resolve(parent, args) {
                return TodoModel.updateOne({_id: args.id}, {completed: args.completed})
            }
        },
        updateTitle: {
            type: updateResultType,
            args: {
                id: {type: GraphQLID},
                title: {type: GraphQLString}
            },
            resolve(parent, args) {
                return TodoModel.updateOne({_id: args.id}, {title: args.title})
            }
        },
        clearCompleted: {
            type: deleteManyResultType,
            resolve(parent, args) {
                return TodoModel.deleteMany({completed: true})
            }
        },
    }

})
module.exports = new GraphQLSchema({
    query,
    mutation
})