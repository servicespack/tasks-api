# Tasks API

Microservice for tasks management

## Getting started

```bash
git clone https://github.com/gabrielrufino/tasks-api.git
cd tasks-api
npm ci
cp .env.example .env
```

**For development:**
```bash
npm run start:dev
``` 

**For production:**
```bash
npm run build
npm start
``` 

## Authorization

Since the Tasks API is a microservice, it does not has the responsibility to manage users and create tokens. So, in a real world the token creation would be outside the Tasks API.

For tests and developmet purposes, you can use the [jwt.io](https://jwt.io) to generate a valid token using the `JWT_SECRET` value that you can find in the `.env` file to sign the payload. The payload should have at least the property `sub` representing the unique id of the user. For exemple:


```json
{
  "sub": "110bab5c-0e5c-4d7c-932c-498be2dcfe7a"
}
```

## API

### Healthcheck

> **GET `/health`**

**Response 200:**
```json
{
  "server": true,
  "database": true
}
```

### Create task

> **POST `/tasks`**

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Body:**
```json
{
  "title": "Complete the challange",
  "description": "Create a Tasks API with tests, documentation, typescript, etc.."
}
```

**Response 201:**
```json
{
  "id": 1,
  "title": "Complete the challange",
  "description": "Create a Tasks API with tests, documentation, typescript, etc..",
  "status": "TO_DO",
  "ownerId": "163e8571-127f-4d25-9dd4-79b1f47e780a",
  "createdAt": "2022-09-18T18:59:01.231Z",
  "updatedAt": "2022-09-18T18:59:01.231Z"
}
```

### Get tasks

> **GET `/tasks`**

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Response 200:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Complete the challange",
      "description": "Create a Tasks API with tests, documentation, typescript, etc..",
      "status": "TO_DO",
      "ownerId": "163e8571-127f-4d25-9dd4-79b1f47e780a",
      "createdAt": "2022-09-18T18:59:01.231Z",
      "updatedAt": "2022-09-18T18:59:01.231Z"
    }
  ],
  "total": 1
}
```

### Update task

> **PATCH `/tasks/:taskId`**

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1..."
}
```

**Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Response 200:**
```json
{
  "id": 1,
  "title": "Complete the challange",
  "description": "Create a Tasks API with tests, documentation, typescript, etc..",
  "status": "IN_PROGRESS",
  "ownerId": "163e8571-127f-4d25-9dd4-79b1f47e780a",
  "createdAt": "2022-09-18T18:59:01.231Z",
  "updatedAt": "2022-09-18T18:59:01.231Z"
}
```
