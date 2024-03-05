import express from 'express';

import env from './config/environment.js';
import { connectDB, getDB } from './config/db.js';

const app = express();

const startServer = () => {
  app.get('/', (req, res) => {
    res.send(`<h1>Hello World!</h1>`);
  });

  app.listen(env.APP_PORT, () => {
    console.log(`Connected to MongoDB and server is running at: http://localhost:${env.APP_PORT}`);
  });
};

connectDB()
  .then(() => getDB())
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
