# Database Configuration

This application now supports three database types:

## SQLite (Default)
```bash
export DATABASE_DRIVER=sqlite3
export DATABASE_URI=./data.db
```

## PostgreSQL
```bash
export DATABASE_DRIVER=postgresql
export DATABASE_URI=postgresql://username:password@localhost:5432/database_name
```

Or with connection object:
```bash
export DATABASE_DRIVER=postgresql
export DATABASE_URI='{"host":"localhost","port":5432,"user":"username","password":"password","database":"database_name"}'
```

## MySQL
```bash
export DATABASE_DRIVER=mysql2
export DATABASE_URI=mysql://username:password@localhost:3306/database_name
```

Or with connection object:
```bash
export DATABASE_DRIVER=mysql2
export DATABASE_URI='{"host":"localhost","port":3306,"user":"username","password":"password","database":"database_name"}'
```

## Running Migrations

To run database migrations manually:
```bash
npx knex migrate:latest
```

To rollback migrations:
```bash
npx knex migrate:rollback
```

## Environment Variables

- `DATABASE_DRIVER`: Database type (`sqlite3`, `postgresql`, `mysql2`)
- `DATABASE_URI`: Connection string or JSON object with connection details
- `NODE_ENV`: Environment (`development`, `production`) - enables debug logging in development

## Migration Notes

The application will automatically run migrations on startup. The migration creates a `tasks` table with the following schema:

- `id`: Primary key (auto-increment)
- `title`: Task title (string, required)
- `description`: Task description (text, required)
- `status`: Task status (string, default: 'TO_DO')
- `owner_id`: User ID who owns the task (string, required)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

An index is created on `owner_id` for better query performance.