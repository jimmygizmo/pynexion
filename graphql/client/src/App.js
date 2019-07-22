import React, { Component } from 'react';

// Components
import BookList from './components/BookList'


class App extends Component {
    render() {
        return (
            <div id="main">
                <h1>Book Store</h1>
                <BookList />
            </div>
        );
    }
}

export default App

