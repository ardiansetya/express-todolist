

```markdown
# Express Todo List with Auth (Express.js, Prisma, PostgreSQL, JWT)

This project is a simple To-Do List application built with **Express.js**, **Prisma ORM**, **PostgreSQL**, and **JWT** authentication.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **PostgreSQL** (installed and running)
- **npm** (Node Package Manager) or **yarn**
- **Prisma** (automatically installed via `npm` or `yarn`)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/todolist-app.git
   cd todolist-app
   ```

2. **Install dependencies**:
   Use `npm` or `yarn` to install the required dependencies:
   ```bash
   npm install
   # or if you're using yarn:
   yarn install
   ```

3. **Configure environment variables**:
   Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
   
   Then, modify the `.env` file to match your own database credentials and JWT secret. Here’s an example:

   ```env
   # Port on which the application will run
   PORT=2000

   # Database connection string (adjust with your database credentials)
   DATABASE_URL=postgresql://<your-username>:<your-password>@localhost:5432/<your-database-name>

   # JWT secret for signing JWT tokens (change this to a secure value)
   JWT_SECRET=<your-jwt-secret>
   ```

   Replace `<your-username>`, `<your-password>`, `<your-database-name>`, and `<your-jwt-secret>` with your actual database credentials and a secure JWT secret.

4. **Set up the PostgreSQL database**:
   Ensure you have a PostgreSQL database running on `localhost` (or update the `DATABASE_URL` in the `.env` file to point to your database).

   To set up your database schema, run the following Prisma commands:

   ```bash
   npx prisma migrate dev --name init
   ```

   This will create the necessary tables in your PostgreSQL database.

5. **Run the application**:
   You can start the Express server by running:

   ```bash
   npm start
   # or if you're using yarn:
   yarn start
   ```

   By default, the application will run on `http://localhost:2000`, but you can modify the port in the `.env` file if needed.

## API Endpoints

### 1. **User Registration**  
   **POST** `/auth/register`  
   Request body (JSON):
   ```json
   {
     "username": "exampleuser",
     "email": "example@example.com",
     "password": "securepassword"
   }
   ```

### 2. **User Login**  
   **POST** `/auth/login`  
   Request body (JSON):
   ```json
   {
     "email": "example@example.com",
     "password": "securepassword"
   }
   ```

   Response:
   ```json
   {
     "token": "your-jwt-token"
   }
   ```

### 3. **Create a New Todo**  
   **POST** `/api/task`  
   Requires JWT authentication.  
   Request body (JSON):
   ```json
   {
     "title": "Finish project",
     "description": "Complete the project by the end of the week"
   }
   ```

### 4. **Get All Todos**  
   **GET** `/api/tasks`  
   Requires JWT authentication.

### 5. **Update a Todo**  
   **PUT** `/task/:id`  
   Requires JWT authentication.  
   Request body (JSON):
   ```json
   {
     "title": "Updated title",
     "description": "Updated description"
   }
   ```

### 6. **Delete a Todo**  
   **DELETE** `/task/:id`  
   Requires JWT authentication.

## Notes

- The JWT token is required for protected routes like creating, updating, and deleting todos. Include the token in the `Authorization` header as a Bearer token.
  
  Example:
  ```bash
  curl -X GET http://localhost:2000/todos -H "Authorization: Bearer <your-jwt-token>"
  ```

## Troubleshooting

- If you encounter issues with Prisma migrations, ensure that your PostgreSQL server is running and accessible.
- If JWT authentication isn't working as expected, ensure the `JWT_SECRET` in your `.env` file is set correctly and is used consistently in the authentication logic.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Penjelasan Struktur README:
1. **Prasyarat**: Daftar perangkat lunak yang harus diinstal seperti Node.js, PostgreSQL, dll.
2. **Setup**: Instruksi untuk mengkloning repositori, menginstal dependensi, mengatur variabel lingkungan, dan melakukan migrasi database dengan Prisma.
3. **Menjalankan Aplikasi**: Instruksi untuk menjalankan server Express.
4. **API Endpoints**: Dokumentasi untuk endpoint API yang tersedia (registrasi, login, CRUD Todo, dll.).
5. **Catatan**: Menyediakan informasi tambahan tentang cara menggunakan JWT untuk autentikasi dan masalah umum yang mungkin dihadapi.

Dengan README ini, siapa pun yang ingin meng-clone dan menjalankan aplikasi Anda akan memiliki instruksi yang jelas tentang cara mempersiapkan dan menjalankannya sesuai dengan pengaturan yang Anda buat.
