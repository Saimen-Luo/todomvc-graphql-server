const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/todomvc-graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to database'))
    .catch((err) => console.log('fail to connect to database', err))