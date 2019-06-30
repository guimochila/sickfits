const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'), {
  recursive: true,
});
const resolversArray = fileLoader(path.join(__dirname, './**/*.js'), {
  recursive: true,
});

module.exports = {
  resolvers: mergeResolvers(resolversArray, { all: true }),
  typeDefs: mergeTypes(typesArray, { all: true }),
};
