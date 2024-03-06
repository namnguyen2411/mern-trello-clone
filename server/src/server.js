/* eslint-disable no-console */
import express from 'express'

import env from './config/environment.js'
import { connectDB, getDB } from './config/db.js'
import apiRoutes from './routes/index.js'

const app = express()

const startServer = () => {
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send(`<h1>Hello World!</h1>`)
  })

  app.use('/api', apiRoutes)

  app.listen(env.APP_PORT, () => {
    console.info(`Connected to MongoDB and server is running at: http://localhost:${env.APP_PORT}`)
  })
}

connectDB()
  .then(() => getDB())
  .then(() => {
    startServer()
  })
  .catch((error) => {
    console.warn(error)
    process.exit(0)
  })
