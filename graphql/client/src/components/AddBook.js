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
        // Need to hold these state vars temporarily in local/function (var)
        // scope so we can perform this.clearFormState() but still have the
        // data available for the mutation. Since the mutation also includes
        // the books query refetch with no way to wedge in the middle, we
        // needed some way to clear the form even before the mutation+refetch.
        var name = this.state.name;
        var genre = this.state.genre;
        var authorid = this.state.authorid;
        this.clearFormState();
        // RESULTS: The above works to clear the state variables BUT the form
        // fields still show the values even though they are not added to
        // a submission. Looks like we need to manually clear the form fields.
        // FINAL FIX: We were never populating the form fields explicitly from
        // the state. The browser was just retaining the data as a default
        // behavior. Since we are in fact blanking out the state for those
        // fields, the fix was to explicitly set the values into the form
        // upon render. Will need to look out for problems, since we know
        // this render is called upon every keypress, but of course, the state
        // is also updated on every keypress too I think so it might work OK.
        // Quick initial tests looks like it works.
        

        this.props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorid: authorid
            },
            refetchQueries: [{query: getBooksQuery}]
        });
        // this.props.addBookMutation({
        //     variables: {
        //         name: this.state.name,
        //         genre: this.state.genre,
        //         authorid: this.state.authorid
        //     },
        //     refetchQueries: [{query: getBooksQuery}]
        // });
        // FAILED - Tried to clear form after a successful book addition by
        // calling my new clearFormState method here, but it did not work and
        // if you notice, it is re-fetching the query and thus re-rendering
        // immediately after the mutation. And so the form is still populated
        // with the recent data. We need another way. Wondering if there is a
        // way to do it in the middle of the addBookMutation steps above. This
        // mutation is doing the re-fetch as a built-in feature at the end of
        // mutation so I have no idea how to get in the middle of that. There
        // must be some other way.
        // this.clearFormState();
    }

    // render() is called very frequently. It is called for every keypress for
    // every character entered into the form, for example.
    render() {
        //console.log(this.props);

        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this)}>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" value={this.state.name} onChange={ (e) => this.setState({name: e.target.value})} />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" value={this.state.genre} onChange={ (e) => this.setState({genre: e.target.value})} />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select value={this.state.authorid} onChange={ (e) => this.setState({authorid: e.target.value})}>
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

