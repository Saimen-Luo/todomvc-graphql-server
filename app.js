const express = require('express')
const graphqlHTTP = require('express-graphql')

const schema = require('./graphql/schema')

const app = express()

require('./mongodb/connect')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => console.log('listening on http://localhost:5000'))