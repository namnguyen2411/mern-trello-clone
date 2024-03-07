/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import env from '#src/config/environment.js'

const errorHandling = (err, req, res, next) => {
  const responseError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  // Duy nhất môi trường DEV mới trả về Stack Trace để debug, còn không phải thì xóa đi
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError)
}

export default errorHandling
