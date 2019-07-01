require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = require('./createServer');

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }),
);

server().applyMiddleware({ app, cors: false });

const port = process.env.PORT;
app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});
