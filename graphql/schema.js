const graph = require('graphql')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = graph

// 临时假数据
let todos = [
    {
        id: 1,
        title: 'xxx',
        completed: true
    },
    {
        id: 2,
        title: 'yyy',
        completed: false
    },
    {
        id: 3,
        title: 'zzz',
        completed: true
    },
]

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
                return todos
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
                id: {type: GraphQLID},
                title: {type: GraphQLString},
                completed: {type: GraphQLBoolean}
            },
            resolve(parent, args) {
                const newTodo = {
                    id: args.id,
                    title: args.title,
                    completed: args.completed
                }
                todos.push(newTodo)
                return newTodo
            }
        }
    }

})
module.exports = new GraphQLSchema({
    query,
    mutation
})