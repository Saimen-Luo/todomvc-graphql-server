const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const schema = require('./graphql/schema')

const app = express()

require('./mongodb/connect')

// 允许跨域
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(5000, () => console.log('listening on http://localhost:5000'))