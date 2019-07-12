const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

//app.use('/graphql', graphqlHTTP({  OPTIONS-GO-HERE  }));
app.use('/graphql', graphqlHTTP({
    // TBD
}));


app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});

