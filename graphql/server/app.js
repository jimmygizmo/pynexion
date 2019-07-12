const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

//app.use('/graphql', graphqlHTTP({  OPTIONS-GO-HERE  }));
app.use('/graphql', graphqlHTTP({
    // In ES6 "schema: schema" can be shortened to just "schema"
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});

