import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
  displayAuthors(){
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (
        <option>Loading authors...</option>
      )
    } else {
      return data.authors.map((author) =>
        <option key={author.id} value={author.id}>{author.name}</option>
      )
    }
  }
  render() {
    return (
      <div>
        {console.log(this.props)}
        <Formik
          initialValues={{ name: '', genre: '', author:'' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            this.props.addBookMutation({
              variables: {
                name: values.name,
                genre: values.genre,
                authorId: values.author
              },
              refetchQueries: [{ query: getBooksQuery }]
            });
            setSubmitting(false);
            }, 400);
          }}
        >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div id="book-name">Book Name:
              <br />
              <Field name="name"/>
            </div>
            <div id="book-genre">Genre:
              <br />
              <Field name="genre" />
            </div>
            <div>Author:
              <br />
              <select
                id="select-author"
                name="author"
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option label="Select Author">Select Author</option>
                {this.displayAuthors()}
              </select>
              <br />
              <button id="submit-book" type="submit">Submit</button>
            </div>
          </Form>
        )}
       </Formik>
     </div>
    );
  }
}

export default compose(
  graphql(addBookMutation, { name: "addBookMutation" }),
  graphql(getAuthorsQuery,{ name: "getAuthorsQuery" })
)(AddBook);
