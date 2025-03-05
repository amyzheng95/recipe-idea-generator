# Recipe Generator App

A web application for generating and managing recipes using Next.js and PostgreSQL.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Environment Variables

Create a `.env` file in the frontend-next directory and add:

```bash
# Replace 'your_secure_password' with your actual database password
DATABASE_URL="postgresql://recipe_user:your_secure_password@localhost:5432/recipe_db?schema=public"
```

Note: Never commit your actual database passwords or sensitive environment variables to version control.

## Setup Database

CREATE USER recipe_user WITH PASSWORD 'your_secure_password' CREATEDB SUPERUSER;
CREATE DATABASE recipe_db OWNER recipe_user;
\c recipe_db
GRANT ALL PRIVILEGES ON DATABASE recipe_db TO recipe_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO recipe_user;
\q

1. Start PostgreSQL:

## Database Management

### Local Development

If you need to reset the database, follow these steps:
# Remove the current migrations folder
rm -rf prisma/migrations

# Remove the current generated client
rm -rf node_modules/.prisma

# Reset Prisma's migration state
npx prisma migrate reset --force

# Create a new migration
1. Create a new migration
npx prisma migrate dev --name init

2. Generate a fresh Prisma client
npx prisma generate

3. Now run the seed
npm run db:seed
```

4. View database:

```bash
# Open Prisma Studio
npx prisma studio
```

### Common Prisma Commands

- `npx prisma generate` - Update Prisma Client
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma migrate reset` - Reset database
- `npx prisma studio` - Open database GUI
- `npx prisma db push` - Push schema changes without migrations schema.prisma
- `npx prisma format` - Format schema file

# Production:
After updating schema.prisma, 
