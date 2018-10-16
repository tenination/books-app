import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Formik, Form, Field } from 'formik';

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

class AddBook extends Component {
  displayAuthors(){
    let data = this.props.data;
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
        <Formik
          initialValues={{ name: '', genre: '', author:'' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
                value={values.author}
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

export default graphql(getAuthorsQuery)(AddBook);
