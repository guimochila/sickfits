require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const server = require('./createServer');

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(cookieParser());

app.use((req, res, next) => {
  const { _token } = req.cookies;

  if (_token) {
    const { userId } = jwt.verify(_token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server().applyMiddleware({ app, cors: false });

const port = process.env.PORT;
app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
