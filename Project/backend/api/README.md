# Lidera TI API

API backend built with Express, TypeScript, and Prisma.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
PORT=3000
NODE_ENV=development
```

3. Generate Prisma Client:
```bash
npm run prisma:generate
```

4. Run database migrations (if needed):
```bash
npm run prisma:migrate
```

## Running the API

### Development mode (with hot reload):
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Soft delete a company

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Soft delete a user

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

```
api/
├── prisma/
│   └── schema.prisma       # Prisma schema definition
├── src/
│   ├── lib/
│   │   └── prisma.ts       # Prisma client instance
│   ├── routes/
│   │   ├── index.ts        # Main router
│   │   ├── company.routes.ts
│   │   └── user.routes.ts
│   ├── app.ts              # Express app configuration
│   └── server.ts           # Server entry point
├── package.json
└── tsconfig.json
```

