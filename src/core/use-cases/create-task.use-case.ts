import { randomUUID } from 'node:crypto';

import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskStatusEnum } from '../enumerables/task-status.enum';
import { ITaskRepository } from '../interfaces/task-repository.interface';
import { IUseCase } from '../interfaces/use-case.interface';

export class CreateTaskUseCase implements IUseCase {
  constructor(
    private readonly taskRepository: ITaskRepository,
  ) {}

  public async execute(dto: CreateTaskDto): Promise<any> {
    const task = new TaskEntity();

    task.id = randomUUID();
    task.title = dto.title;
    task.description = dto.description;
    task.status = TaskStatusEnum.ToDo;

    return this.taskRepository.create(dto);
  }
}
