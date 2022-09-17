import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core'

import { TaskStatus } from '../enumerables/task-status.enum'

@Entity()
export class Task {
  @PrimaryKey({ type: Number, autoincrement: true })
  public id!: number

  @Property({ type: String })
  public title!: string

  @Property({ type: String })
  public description!: string

  @Enum({ type: String, items: () => TaskStatus })
  public status!: TaskStatus

  @Property({ type: Date })
  public createdAt: Date = new Date()

  @Property({ type: Date, onUpdate: () => new Date() })
  public updatedAt: Date = new Date()
}
