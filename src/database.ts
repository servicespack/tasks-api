import { Connection, EntityManager, IDatabaseDriver, MikroORM, Options } from '@mikro-orm/core'

import { NodeEnv } from './enumerables/node-env.enum'
import { Task } from './entities/task.entity'

const {
  DATABASE = 'data.db',
  NODE_ENV = NodeEnv.DEVELOPMENT
} = process.env

class Database {
  private readonly config: Options = {
    type: 'sqlite',
    dbName: DATABASE,
    entities: [Task],
    debug: NODE_ENV === NodeEnv.DEVELOPMENT
  }

  private orm!: MikroORM

  public get em (): EntityManager<IDatabaseDriver<Connection>> {
    return this.orm.em.fork()
  }

  public async init (): Promise<void> {
    this.orm = await MikroORM.init(this.config)

    await this.orm
      .getSchemaGenerator()
      .updateSchema()
  }

  public async isConnected (): Promise<boolean> {
    return await this.orm.isConnected()
  }

  public async close (): Promise<void> {
    await this.orm.close()
  }
}

export const database = new Database()
