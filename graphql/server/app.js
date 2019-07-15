const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// Initial usage of dotenv - Do we have any reason for a const var here?
require('dotenv').config();
//console.log(process.env);

const app = express();

const dbpass = process.env.REACT_APP_DB_PASS;
const dbuser = process.env.REACT_APP_DB_USER;
const dbhost = process.env.REACT_APP_DB_HOST;

var connstr = 'mongodb+srv://';
connstr += dbuser + ':' + dbpass;
connstr += '@' + dbhost;
connstr += '/test?retryWrites=true&w=majority';
//console.log(connstr);

mongoose.connect(connstr);
mongoose.connection.once('open', () => {
    console.log('connected to DB');
})

//app.use('/graphql', graphqlHTTP({  OPTIONS-GO-HERE  }));
app.use('/graphql', graphqlHTTP({
    // In ES6 "schema: schema" can be shortened to just "schema"
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});

