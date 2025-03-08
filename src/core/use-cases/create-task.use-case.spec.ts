import { describe, it, expect, beforeEach, vi } from 'vitest';

import { CreateTaskUseCase } from './create-task.use-case';
import { ITaskRepository } from '../interfaces/task-repository.interface';

describe(CreateTaskUseCase.name, () => {
  let taskRepository: ITaskRepository

  beforeEach(() => {
    taskRepository = {
      create: vi.fn(),
    }
  })

  it('should create a task', async () => {
    const useCase = new CreateTaskUseCase(taskRepository);

    await useCase.execute({
      title: 'Task title',
      description: 'Task description',
    });

    expect(taskRepository.create).toHaveBeenCalled();
  });
});
