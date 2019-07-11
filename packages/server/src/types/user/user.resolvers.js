const { randomBytes } = require('crypto');
const { promisify } = require('util');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.APP_SECRET);
}

function setCookie(res, token) {
  return res.cookie('_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
}

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

      const token = generateToken(user.id);
      setCookie(res, token);

      return user;
    },

    async signin(_, { email, password }, { db, res }) {
      const user = await db.query.user({ where: { email } });

      if (!user) {
        throw new AuthenticationError('Email or password invalid.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new AuthenticationError('Email or password invalid.');
      }

      const token = generateToken(user.id);
      setCookie(res, token);
      return user;
    },

    signout(_, __, { res }) {
      res.clearCookie('_token');
      return { message: 'Goodbye!' };
    },

    async requestReset(_, { email }, { db }) {
      const user = await db.query.user({ where: { email } });

      if (!user) {
        throw new Error('Password reset email sent. Please verify your email.');
      }

      const resetToken = (await promisify(randomBytes)(20)).toString('hex');
      const resetTokenExpiry = Date.now() * 3600000; // 1 hours from now
      await db.mutation.updateUser({
        where: { email },
        data: {
          resetToken,
          resetTokenExpiry,
        },
      });

      return {
        message: 'Password reset email sent. Please verify your email.',
      };
    },

    async resetPassword(_, args, { db, res }, info) {
      const { resetToken, password, confirmPassword } = args;

      if (password !== confirmPassword) {
        throw new Error('Password and confirm password input does not match.');
      }

      const [user] = await db.query.users({
        where: {
          resetToken,
          resetTokenExpiry_gte: Date.now() - 360000,
        },
      });

      if (!user) {
        throw new Error('Invalid or expiry token');
      }

      const newPassword = await bcrypt.hash(password, 10);

      const updatedUser = await db.mutation.updateUser(
        {
          where: { email: user.email },
          data: {
            password: newPassword,
            resetToken: null,
            resetTokenExpiry: null,
          },
        },
        info,
      );

      const token = generateToken(user.id);
      setCookie(res, token);

      return updatedUser;
    },
  },
};
