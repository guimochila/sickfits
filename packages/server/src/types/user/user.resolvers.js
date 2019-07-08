const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    me(_, __, { db, req }, info) {
      if (!req.userId) {
        return null;
      }

      return db.query.user(
        {
          where: {
            id: req.userId,
          },
        },
        info,
      );
    },
  },
  Mutation: {
    async signup(_, args, { db, res }, info) {
      const { name, email, password } = args;

      // Validate Email
      if (!validator.isEmail(email) || validator.isEmpty(email)) {
        throw new Error('You must provide a valid email.');
      }

      const validatedEmail = validator.normalizeEmail(email, {
        all_lowercase: true,
        gmail_remove_subaddress: true,
      });

      // Hashing password
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.mutation.createUser(
        {
          data: {
            name,
            email: validatedEmail,
            password: hashedPassword,
            permissions: {
              set: ['USER'],
            },
          },
        },
        info,
      );

      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      res.cookie('_token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });

      return user;
    },
  },
};
