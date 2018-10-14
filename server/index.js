const express = require('express');
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mLab database
mongoose.connect("mongodb://test-user:test123@ds131763.mlab.com:31763/books-app-db");
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000.')
});
