export interface ITaskRepository {
  create: (dto: any) => Promise<any>
}
