import knex, { type Knex } from 'knex';
import path from 'path';

import { NodeEnv } from './enums/node-env.enum';

const {
  DATABASE_DRIVER = 'sqlite3',
  DATABASE_URI = 'data.db',
  NODE_ENV = NodeEnv.DEVELOPMENT,
} = process.env;

export class Database {
  private knexInstance!: Knex;

  private get config(): Knex.Config {
    const baseConfig = {
      migrations: {
        directory: path.join(__dirname, '..', 'migrations'),
      },
    };

    switch (DATABASE_DRIVER) {
      case 'postgresql':
      case 'pg':
        return {
          ...baseConfig,
          client: 'pg',
          connection: this.parsePostgresConnection(DATABASE_URI),
          debug: NODE_ENV === NodeEnv.DEVELOPMENT,
          pool: {
            min: 2,
            max: 10
          }
        };
      
      case 'mysql':
      case 'mysql2':
        return {
          ...baseConfig,
          client: 'mysql2',
          connection: this.parseMysqlConnection(DATABASE_URI),
          debug: NODE_ENV === NodeEnv.DEVELOPMENT,
          pool: {
            min: 2,
            max: 10
          }
        };
      
      case 'sqlite':
      case 'sqlite3':
      default:
        return {
          ...baseConfig,
          client: 'sqlite3',
          connection: {
            filename: DATABASE_URI,
          },
          useNullAsDefault: true,
          debug: NODE_ENV === NodeEnv.DEVELOPMENT,
        };
    }
  }

  private parsePostgresConnection(uri: string): any {
    // Support both connection string and object format
    if (uri.startsWith('postgres://') || uri.startsWith('postgresql://')) {
      return uri;
    }
    
    // For object-style configuration from environment
    try {
      return JSON.parse(uri);
    } catch {
      return uri;
    }
  }

  private parseMysqlConnection(uri: string): any {
    // Support both connection string and object format
    if (uri.startsWith('mysql://')) {
      return uri;
    }
    
    // For object-style configuration from environment
    try {
      return JSON.parse(uri);
    } catch {
      return uri;
    }
  }

  public get knex(): Knex {
    return this.knexInstance;
  }

  public async init(): Promise<void> {
    this.knexInstance = knex(this.config);
    
    // Run migrations to ensure schema is up to date
    await this.knexInstance.migrate.latest();
  }

  public async isConnected(): Promise<boolean> {
    try {
      await this.knexInstance.raw('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  public async close(): Promise<void> {
    if (this.knexInstance) {
      await this.knexInstance.destroy();
    }
  }
}

export const database = new Database();
