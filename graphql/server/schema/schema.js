const graphql = require('graphql');
const _ = require('lodash');

// The below syntax is called 'destructuring' and sort of grabs the object
// GraphQLObjectType in the curly brackets out of the namespace, graphql in
// this case. Seems similar to Python's: from module import ClassName
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

// test data to use prior to implementing MongoDB
var books = [
    {name: 'Book Title 1', genre: 'Fantasy', id: '1'},
    {name: 'Book Title 2', genre: 'Fantasy', id: '2'},
    {name: 'Book Title 3', genre: 'Sci-Fi', id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // Shows that args.id is always string at this point which
                // is the type stored in the array we run _.find against.
                // TODO: Clarify exactly how that works. In video this is at
                // 1:02-1:03.
                //console.log(typeof(args.id))
                return _.find(books, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // initial root query
    query: RootQuery
});

