# E-Commerce Backend Template

This project is a backend template for an e-commerce store using Node.js, Express.js, TypeScript, Prisma, and Turso.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [License](#license)

## Features

- **Node.js** and **Express.js** for the server.
- **TypeScript** for type safety.
- **Prisma** for database ORM.
- **Turso** for database management.
- Modular routing for easier management of endpoints.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/backend-template.git
   ```

2. Navigate into the project directory:

   ```bash
   cd backend-template
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your database URL and authentication token:
     ```env
     TURSO_DATABASE_URL=your_database_url
     TURSO_AUTH_TOKEN=your_auth_token
     ```

## Usage

1. **Apply Migrations**:

   ```bash
   npm run tpush
   ```

2. **Start the Server**:

   ```bash
   npm start
   ```

3. **Access the Endpoints**:
   - Products: `http://localhost:3001/api/products`

## Scripts

- **`migrate`**: Run migrations using Prisma.

  ```bash
  npm run migrate
  ```

- **`db:update`**: Push the Prisma schema to the database.

  ```bash
  npm run db:update
  ```

- **`gen`**: Generate Prisma client.

  ```bash
  npm run gen
  ```

- **`tpush`**: Apply migrations to Turso database.
  ```bash
  npm run tpush
  ```

## Folder Structure

- **`prisma/`**: Contains the Prisma schema and migration files.
- **`routes/`**: Contains route files, such as `product.get.ts` for product-related routes.
- **`scripts/`**: Contains scripts, such as `migrate2Turso.js` for migration handling.
- **`utils/`**: Contains utility files, such as database connection setup.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
