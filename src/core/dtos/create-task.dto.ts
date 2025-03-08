import { TaskEntity } from '../entities/task.entity';

export type CreateTaskDto = Pick<TaskEntity, 'title' | 'description'>;
