import { Connection, EntityManager, IDatabaseDriver, MikroORM, Options } from '@mikro-orm/core'

import { Task } from './entities/task.entity'

const {
  DATABASE = 'data.db'
} = process.env

class Database {
  private readonly config: Options = {
    type: 'sqlite',
    dbName: DATABASE,
    entities: [Task],
    debug: true
  }

  public em!: EntityManager<IDatabaseDriver<Connection>>

  public async init (): Promise<void> {
    const { em } = await MikroORM.init(this.config)

    this.em = em
  }
}

export const database = new Database()
