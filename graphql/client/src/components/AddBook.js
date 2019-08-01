import React, { Component } from 'react';
//import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'


class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: "",
            genre: "",
            authorid: ""
        }
    }

    // Tried to set state directly with this.state =, but got a warning,
    // advising I must use setState like so. It is only OK to set the state
    // directly in the constructor as above.
    clearFormState(){
        this.setState({
            name: "",
            genre: "",
            authorid: ""
        });
    }

    displayAuthors(){
        var data = this.props.getAuthorsQuery
        //console.log(this.props);
        if (data.loading) {
            return( <option disabled>Loading authors...</option> );
        } else {
            return data.authors.map(author => {
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            });  
        }
    }

    submitForm(e){
        e.preventDefault();  // Prevent default HTML form submission behavior.
        //console.log(this.state);
        // Temporarily hold form state so we can this.clearFormState()
        var name = this.state.name;
        var genre = this.state.genre;
        var authorid = this.state.authorid;
        this.clearFormState();
        // Default broswer behavior was keeping data in form fields so we
        // finally got the form to clear after a submit by explicitly writing
        // state to the fields on each render, which also writes the cleared
        // empty string values after a submit which is what we wanted.

        this.props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorid: authorid
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    }

    // render() is called very frequently. It is called for every keypress for
    // every character entered into the form, for example.
    render() {
        //console.log(this.props);

        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this)}>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" value={this.state.name} onChange={
                        (e) => this.setState({name: e.target.value})} />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={this.state.genre} onChange={
                        (e) => this.setState({genre: e.target.value})} />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select value={this.state.authorid} onChange={
                        (e) => this.setState({authorid: e.target.value})}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        );
    }

}


export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);

