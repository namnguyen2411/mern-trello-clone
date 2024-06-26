/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import corsOptions from './config/cors.js'
import env from './config/environment.js'
import { connectDB, getDB } from './config/db.js'
import apiRoutes from './routes/index.js'
import errorHandling from './middlewares/errorHandling.js'
import { job } from './config/cron.js'

const app = express()

const startServer = () => {
  app.use(express.json())
  app.use(cors(corsOptions))

  job.start()

  app.get('/', (req, res) => {
    res.send(`<h1>Hello World!</h1>`)
  })

  app.use('/api', apiRoutes)

  app.use(errorHandling)

  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.info(`Connected to MongoDB and server is running at port: ${process.env.PORT}`)
    })
  } else {
    app.listen(env.APP_PORT, () => {
      console.info(`Connected to MongoDB and server is running at: http://localhost:${env.APP_PORT}`)
    })
  }
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
