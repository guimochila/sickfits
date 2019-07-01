const { ApolloServer } = require('apollo-server-express');
const db = require('./database')();
const { typeDefs, resolvers } = require('./types');

function createServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res, db }),
  });
}

module.exports = createServer;
