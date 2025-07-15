import { TaskStatus } from '../enums/task-status.enum';

export interface TaskData {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  public id?: number;
  public title: string;
  public description: string;
  public status: TaskStatus;
  public ownerId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(params: {
    title: string;
    description: string;
    ownerId: string;
    id?: number;
    status?: TaskStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.description = params.description;
    this.ownerId = params.ownerId;
    this.status = params.status || TaskStatus.TO_DO;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  // Convert database row to Task instance
  static fromRow(row: any): Task {
    if (!row) {
      throw new Error('Cannot create Task from null or undefined row');
    }
    
    // Handle different date formats from different databases
    const parseDate = (dateValue: any): Date => {
      if (!dateValue) return new Date();
      if (dateValue instanceof Date) return dateValue;
      // For SQLite, dates might be stored as strings or integers
      return new Date(dateValue);
    };
    
    return new Task({
      id: row.id,
      title: row.title,
      description: row.description,
      ownerId: row.owner_id,
      status: row.status as TaskStatus,
      createdAt: parseDate(row.created_at),
      updatedAt: parseDate(row.updated_at),
    });
  }

  // Convert Task instance to database row format
  toRow(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      owner_id: this.ownerId,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }

  // Ensure proper JSON serialization
  toJSON(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      ownerId: this.ownerId,
      createdAt: this.createdAt instanceof Date && !isNaN(this.createdAt.getTime()) 
        ? this.createdAt.toISOString() 
        : new Date().toISOString(),
      updatedAt: this.updatedAt instanceof Date && !isNaN(this.updatedAt.getTime()) 
        ? this.updatedAt.toISOString() 
        : new Date().toISOString(),
    };
  }
}
