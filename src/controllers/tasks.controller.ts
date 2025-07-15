import { type Request, type Response } from 'express';

import { database } from '../database';
import { Task } from '../entities/task.entity';
import { NotFound } from '../exceptions/not-found.exception';

export class TasksController {
  public async findMany(request: Request, response: Response): Promise<Response> {
    const { id: ownerId } = request.user;
    
    // Get tasks and count in parallel
    const [tasks, countResult] = await Promise.all([
      database.knex('tasks')
        .where('owner_id', ownerId)
        .orderBy('created_at', 'desc'),
      database.knex('tasks')
        .where('owner_id', ownerId)
        .count('id as total')
        .first()
    ]);

    const data = tasks.map(Task.fromRow);
    const total = countResult?.total || 0;

    return response.json({ data, total });
  }

  public async createOne(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.body;
    const { id: ownerId } = request.user;

    // Create the task object to get consistent timestamps
    const task = new Task({
      title,
      description,
      ownerId,
    });

    const taskRow = task.toRow();
    
    const result = await database.knex('tasks').insert(taskRow);
    
    // For SQLite, the result is an array with the row ID
    const insertedId = Array.isArray(result) ? result[0] : result;
    
    // Update the task with the inserted ID
    task.id = insertedId;

    return response.status(201).json(task);
  }

  public async updateOne(request: Request, response: Response): Promise<Response> {
    const taskId = Number(request.params.taskId);
    const { id: ownerId } = request.user;

    // Find the task first
    const existingTask = await database.knex('tasks')
      .where('id', taskId)
      .where('owner_id', ownerId)
      .first();

    if (!existingTask) {
      return response.status(404).json(new NotFound());
    }

    const {
      title = existingTask.title,
      description = existingTask.description,
      status = existingTask.status,
    } = request.body;

    // Update the task
    await database.knex('tasks')
      .where('id', taskId)
      .where('owner_id', ownerId)
      .update({
        title,
        description,
        status,
        updated_at: new Date(),
      });

    // Fetch the updated task
    const updatedTaskRow = await database.knex('tasks')
      .where('id', taskId)
      .first();

    const task = Task.fromRow(updatedTaskRow);

    return response.json(task);
  }
}

export const controller = new TasksController();
