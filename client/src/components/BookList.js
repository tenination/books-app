import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

class BookList extends Component {
  displayBooks(){
    let data = this.props.data;
    if (data.loading) {
      return (
        <div>Loading books...</div>
      )
    } else {
      return data.books.map((book) =>
        <li key={book.id}>{book.name}</li>
      )
    }
  }
  render() {
    console.log('rendering BookList component');
    console.log('this.props');
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
