const graphql = require('graphql');

// The below syntax is called 'destructuring' and sort of grabs the object
// GraphQLObjectType in the curly brackets out of the namespace, graphql in
// this case. Seems similar to Python's: from module import ClassName
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

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
                // Will use: args.id
                // code to get data from DB / other source
            }
        }
    }
});

module.exports = new GraphQLSchema({
    // initial root query
    query: RootQuery
});

