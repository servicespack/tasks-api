const path = require('path');

module.exports = {
  development: {
    client: process.env.DATABASE_DRIVER || 'sqlite3',
    connection: {
      filename: process.env.DATABASE_URI || './data.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.join(__dirname, 'migrations')
    }
  },

  production: {
    client: process.env.DATABASE_DRIVER || 'sqlite3',
    connection: process.env.DATABASE_DRIVER === 'postgresql' 
      ? process.env.DATABASE_URI
      : process.env.DATABASE_DRIVER === 'mysql2'
      ? process.env.DATABASE_URI  
      : {
          filename: process.env.DATABASE_URI || './data.db'
        },
    useNullAsDefault: process.env.DATABASE_DRIVER === 'sqlite3',
    migrations: {
      directory: path.join(__dirname, 'migrations')
    }
  }
};