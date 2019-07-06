const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const { importSchema } = require('graphql-import');

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'), {
  recursive: true,
});

const mergedWithPrisma = typesArray.map(file => importSchema(file));

const resolversArray = fileLoader(path.join(__dirname, './**/*.js'), {
  recursive: true,
});

module.exports = {
  resolvers: mergeResolvers(resolversArray, { all: true }),
  typeDefs: mergeTypes(mergedWithPrisma, { all: true }),
};
