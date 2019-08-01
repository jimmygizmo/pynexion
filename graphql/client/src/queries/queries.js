import { gql } from 'apollo-boost';


const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`


const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

// Query variables:
// Note the exclamation point on the end of GraphQL data types. This ! means
// that these variables must not be null. ! means not null, required.

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorid: ID!) {
        addBook(name: $name, genre: $genre, authorid: $authorid){
            name
            id
        }
    }
`

// Mutations can be optionally named. Like this:
//mutation AddBook(vars in here)
// For now the above mutation will remain unnamed.


const getBookQuery = gql`
    query($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

export { getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery };

