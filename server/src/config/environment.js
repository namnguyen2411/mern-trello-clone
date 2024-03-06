import 'dotenv/config'

const env = {
  APP_PORT: process.env.APP_PORT,
  BUILD_MODE: process.env.BUILD_MODE,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME
}

export default env
