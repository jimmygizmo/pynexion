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
const dbname = process.env.REACT_APP_DB_NAME;
const dboptions = process.env.REACT_APP_DB_OPTIONS;

// Port numbers not accepted when using connection string format mongodb+srv.
// Note that docs confusingly say that when using useNewUrlParset: true, port
// numbers are require but this must apply to some other conn string format
// beacuse I got an error when adding port number (27017) which is the port
// number I see being used by compass.
var connstr = 'mongodb+srv://';
connstr += dbuser + ':' + dbpass;
connstr += '@' + dbhost;
connstr += '/' + dbname + dboptions;
//console.log(connstr);

//Mongoose connect: Current URL string parser is deprecated and will be remved
// so start using the new one now with this option: { useNewUrlParser: true }
mongoose.connect(connstr,{ useNewUrlParser: true });
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

