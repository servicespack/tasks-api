import {
  Entity, Enum, PrimaryKey, Property,
} from '@mikro-orm/core';

import { TaskStatus } from '../enums/task-status.enum';

@Entity()
export class Task {
  constructor(params: {
    title: string
    description: string
    ownerId: string
  }) {
    this.title = params.title;
    this.description = params.description;
    this.ownerId = params.ownerId;
    this.status = TaskStatus.TO_DO;
  }

  @PrimaryKey({ type: Number, autoincrement: true })
  public id!: number;

  @Property({ type: String })
  public title!: string;

  @Property({ type: String })
  public description!: string;

  @Enum({ type: String, items: () => TaskStatus })
  public status!: TaskStatus;

  @Property({ type: String })
  public ownerId!: string;

  @Property({ type: Date })
  public createdAt: Date = new Date();

  @Property({ type: Date, onUpdate: () => new Date() })
  public updatedAt: Date = new Date();
}
