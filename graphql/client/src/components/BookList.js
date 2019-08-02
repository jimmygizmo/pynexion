import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries'

// Components
import BookDetails from './BookDetails'


class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    displayBooks(){
        var data = this.props.data;
        if (data.loading) {
            return( <div>Loading books...</div> );
        } else {
            return data.books.map(book => {
                return(
                    <li key={book.id} onClick={ (e) =>
                        { this.setState({ selected: book.id }) }
                    }>{book.name}</li>
                );
            });
        }
    }

    render() {
        // Log to show the binding to graphql/getBooksQuery of this component:
        // The graphql data we need for the component will now be stored in
        // this components props because of the binding we did below at export.
        //console.log(this.props);

        return (
            <div id="main">
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookid={ this.state.selected }/>
            </div>
        );
    }

}

export default graphql(getBooksQuery)(BookList);

