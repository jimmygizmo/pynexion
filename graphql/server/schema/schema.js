const graphql = require('graphql');
const _ = require('lodash');

// The below syntax is called 'destructuring' and sort of grabs the object
// GraphQLObjectType in the curly brackets out of the namespace, graphql in
// this case. Seems similar to Python's: from module import ClassName
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

// test data to use prior to implementing MongoDB
var books = [
    {name: 'Book Title 1', genre: 'Fantasy', id: '1'},
    {name: 'Book Title 2', genre: 'Fantasy', id: '2'},
    {name: 'Book Title 3', genre: 'Sci-Fi', id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // initial root query
    query: RootQuery
});

