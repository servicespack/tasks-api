import { Request, Response } from 'express'

import { Task } from '../entities/task.entity'
import { database } from '../database'

export class TasksController {
  public async findMany (request: Request, response: Response): Promise<Response> {
    const [data, total] = await database.em.findAndCount(Task, {})
    return response.json({ data, total })
  }

  public async findOne (request: Request, response: Response): Promise<Response> {
    const task = await database.em.findOne(Task, Number(request.params.taskId))
    if (task === null) {
      return response.status(404).json('Not found')
    }

    return response.json(task)
  }

  public async createOne (request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body

    const task = new Task({
      title,
      description
    })

    await database.em.persistAndFlush(task)

    return response.status(201).json(task)
  }

  public async updateOne (request: Request, response: Response): Promise<Response> {
    const task = await database.em.findOne(Task, Number(request.params.taskId))
    if (task === null) {
      return response.status(404).json('Not found')
    }

    const {
      title = task.title,
      description = task.description,
      status = task.status
    } = request.body

    task.title = title
    task.description = description
    task.status = status

    await database.em.persistAndFlush(task)

    return response.json(task)
  }

  public async deleteOne (request: Request, response: Response): Promise<Response> {
    const task = await database.em.findOne(Task, Number(request.params.taskId))
    if (task === null) {
      return response.status(404).json('Not found')
    }

    await database.em.removeAndFlush(task)

    return response.json(task)
  }
}

export const controller = new TasksController()
