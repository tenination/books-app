import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

class AddBook extends Component {
  render() {
    return (
      <div>
        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            }, 400);
          }}
        >
        {({ isSubmitting }) => (
          <Form>
            <div>Book Name:
              <br />
              <Field type="text" name="book-name"/>
            </div>
            <div>Genre:
              <br />
              <Field type="text" name="book-genre" />
            </div>
            <div>Author:
              <br />
              <select name="car">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <br />
              <button/>
            </div>
          </Form>
        )}
       </Formik>
     </div>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
