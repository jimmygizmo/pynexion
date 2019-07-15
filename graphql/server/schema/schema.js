const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')

// The below syntax is called 'destructuring' and sort of grabs the various
// objects in the curly brackets out of the namespace, graphql in
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
// var books = [
//     {name: 'Book Title 1', genre: 'Fantasy', id: '1', authorid: '1'},
//     {name: 'Book Title 2', genre: 'Fantasy', id: '2', authorid: '2'},
//     {name: 'Book Title 3', genre: 'Sci-Fi', id: '3', authorid: '3'},
//     {name: 'Book Title 4', genre: 'Fantasy', id: '1', authorid: '2'},
//     {name: 'Book Title 5', genre: 'Fantasy', id: '2', authorid: '3'},
//     {name: 'Book Title 6', genre: 'Fantasy', id: '3', authorid: '3'},
// ];

// var authors = [
//     {name: 'Bob Jamonevitch', age: 44, id: '1'},
//     {name: 'Melvin McGill', age: 42, id: '2'},
//     {name: 'Larry Boonsmith', age: 66, id: '3'},
// ];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                // console.log(parent);
                // return _.find(authors, {id: parent.authorid});

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
                // return _.filter(books, {authorid: parent.id});
            }
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
                // return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    // initial root query
    query: RootQuery,
    mutation: Mutation
});

