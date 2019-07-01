const { Prisma } = require('prisma-binding');
const path = require('path');

function configureDB() {
  return new Prisma({
    typeDefs: path.join(__dirname, '../prisma/generated/prisma.graphql'),
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
    debug: false,
  });
}

module.exports = configureDB;
