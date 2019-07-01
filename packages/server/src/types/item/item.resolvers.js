const { forwardTo } = require('prisma-binding');

module.exports = {
  Query: {
    items: forwardTo('db'),
  },
  Mutation: {
    async createItem(_, args, { db }, info) {
      // TODO: Check if user is authenticated

      const item = await db.mutation.createItem({ data: { ...args } }, info);

      return item;
    },
  },
};
