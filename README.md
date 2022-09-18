# Every - Tasks API

Microservice for tasks management

## Getting started

```bash
git clone https://github.com/gabrielrufino/every-tasks-api.git
cd every-tasks-api
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

## API

> GET /health

**Response 200:**
```json
{
  "server": true,
  "database": true
}
```

> POST /tasks

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
