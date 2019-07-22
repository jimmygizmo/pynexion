import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

// CORS: Is preventing the connection from the page running at localhost:3000
// to fetch at the graphql server running at localhost:4000
// Perhaps we need to add a header: Access-Control-Allow-Origin
// 405 error to that internal request

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`


class BookList extends Component {
    render() {
        // To show the binding to graphql/getBooksQuery of this component:
        // The graphql data we need for the component will now be stored in
        // this components props because of the binding we did below at export.
        console.log(this.props);
        return (
            <div id="main">
                <ul id="book-list">
                    <li>Book Name</li>
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
