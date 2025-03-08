import type { TaskStatusEnum } from '../enumerables/task-status.enum'

export class TaskEntity {
  id!: string

  title!: string

  description!: string

  status!: TaskStatusEnum

  ownerId!: string
}
