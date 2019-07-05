const { forwardTo } = require('prisma-binding');

module.exports = {
  Query: {
    items: forwardTo('db'),
    item: forwardTo('db'),
  },
  Mutation: {
    async createItem(_, args, { db }, info) {
      // TODO: Check if user is authenticated

      const item = await db.mutation.createItem({ data: { ...args } }, info);

      return item;
    },
    async updateItem(_, args, { db }, info) {
      const updates = { ...args.input };
      if (updates.id) delete updates.id;

      return db.mutation.updateItem(
        {
          data: updates,
          where: {
            id: args.id,
          },
        },
        info,
      );
    },
    async deleteItem(_, args, { db }, info) {
      const where = { id: args.id };
      // Find the Item
      // const item = await db.query.item({ where }, `{id, title}`);
      // TODO: Check if the own the Item
      // Delete Item
      return db.mutation.deleteItem({ where }, info);
    },
  },
};
