const graphql = require('graphql');
const _ = require('lodash');

// The below syntax is called 'destructuring' and sort of grabs the object
// GraphQLObjectType in the curly brackets out of the namespace, graphql in
// this case. Seems similar to Python's: from module import ClassName
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// test data to use prior to implementing MongoDB
var books = [
    {name: 'Book Title 1', genre: 'Fantasy', id: '1', authorid: '1'},
    {name: 'Book Title 2', genre: 'Fantasy', id: '2', authorid: '2'},
    {name: 'Book Title 3', genre: 'Sci-Fi', id: '3', authorid: '3'},
    {name: 'Book Title 4', genre: 'Fantasy', id: '1', authorid: '2'},
    {name: 'Book Title 5', genre: 'Fantasy', id: '2', authorid: '3'},
    {name: 'Book Title 6', genre: 'Fantasy', id: '3', authorid: '3'},
];

var authors = [
    {name: 'Bob Jamonevitch', age: 44, id: '1'},
    {name: 'Melvin McGill', age: 42, id: '2'},
    {name: 'Larry Boonsmith', age: 66, id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorid});

            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorid: parent.id})
            }
            ////////////////////////
        }
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
                // NOTE: Clarification is provided by reading the definition
                // of the GraphQLID type in the graphiql utility right side
                // window. Basically, it accepts String or Int for input but
                // treats both as a String. This definition is in the context
                // of results data but the inverse can be assumed for queries,
                // which is the context here. Best explanation I got so far.
                //console.log(typeof(args.id))
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // initial root query
    query: RootQuery
});

