import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries'


class BookList extends Component {

    displayBooks(){
        var data = this.props.data;
        if (data.loading) {
            return( <div>Loading books...</div> );
        } else {
            return data.books.map(book => {
                return(
                    <li key={book.id}>{book.name}</li>
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
            </div>
        );
    }

}

export default graphql(getBooksQuery)(BookList);


/*
Tutorial code is a bit different, using a class that extends Component.
This was taken from App.js and this App.js is also different in the tutorial.
It looks like the most recent create-react-app might work differently than
that from the time of the tutorial. Tutorial: May 2018. Now: July, 2019
INFO ON THIS:
https://stackoverflow.com/questions/56297983/create-react-app-generates-function-instead-of-class-in-app-js
Looks like it is not a big deal and the newer CRA does this to be consistent
with their documentation. I think I will change to the class strategy.
UNCLEAR IF THEY MIGHT ACTUALLY CHANGE IT BACK AGAIN. MORE INFO:
https://github.com/facebook/create-react-app/pull/6655


import React, { Component } from 'react';

class BookList extends Component {
    render() {
        return (
            <div id="main">
                <h1>Book Store</h1>
            </div>
        );
    }
}

export default BookList


I have now changed this file and App.js to the more familiar class format.
For reference, here is the funciton style that the newest CRA is generating:


import React from 'react';

function App() {
  return (
    <div id="main">
      <h1>Book Store</h1>
    </div>
  );
}

export default App;


*/
