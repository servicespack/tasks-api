import { type ClassConstructor, plainToClass } from 'class-transformer'
import { type NextFunction, type Request, type Response } from 'express'
import { validate } from 'class-validator'

export function validator (dto: ClassConstructor<unknown>) {
  return async function (request: Request, response: Response, next: NextFunction) {
    const instance = plainToClass(dto, request.body)
    const errors = await validate(instance as object)

    if (errors.length > 0) {
      return response.status(400).json({ errors })
    }

    next()
  }
}
