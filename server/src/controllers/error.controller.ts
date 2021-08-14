import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'

async function handlerError(
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!error.status) {
    console.error(error)
  }

  const status = error.status || 500

  error.code = status

  return response.status(status).json({ error: error, date: new Date() })
}

export default { handlerError }
