const path = require('path');

function getConnection() {
  const driver = process.env.DATABASE_DRIVER || 'sqlite3';
  const uri = process.env.DATABASE_URI || './data.db';

  switch (driver) {
    case 'postgresql':
    case 'pg':
      return {
        client: 'pg',
        connection: uri.startsWith('postgres') ? uri : JSON.parse(uri),
        pool: { min: 2, max: 10 }
      };
    
    case 'mysql':
    case 'mysql2':
      return {
        client: 'mysql2',
        connection: uri.startsWith('mysql') ? uri : JSON.parse(uri),
        pool: { min: 2, max: 10 }
      };
    
    case 'sqlite':
    case 'sqlite3':
    default:
      return {
        client: 'sqlite3',
        connection: { filename: uri },
        useNullAsDefault: true
      };
  }
}

const config = getConnection();

module.exports = {
  development: {
    ...config,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    }
  },

  production: {
    ...config,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    }
  }
};