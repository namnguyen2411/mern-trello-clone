import { MongoClient, ServerApiVersion } from 'mongodb'
import env from './environment.js'

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
let trelloDB

export const connectDB = async () => {
  await client.connect()
  trelloDB = client.db(env.DB_NAME)
}

export const getDB = () => {
  if (!trelloDB) throw new Error('Database not connected')
  return trelloDB
}

export const disconnectDB = async () => {
  await client.close()
}
