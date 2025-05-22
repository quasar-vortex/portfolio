## Portfolio FrontEnd

![Portfolio](./port.png)

## 🧠 Portfolio Backend API

This is the backend REST API for the Portfolio Platform. It manages users, projects, uploads, and authentication using Node.js, Express.js, Prisma, PostgreSQL, and AWS S3 (or equivalent).

### 🧩 Tech Stack

- Node.js + Express.js
- TypeScript
- PostgreSQL (via Prisma ORM)
- JWT Authentication (access + refresh tokens)
- Argon2 password hashing
- AWS S3 or compatible object storage
- Zod validation
- Multer for file uploads
- Pino for structured logging

---

### 🔐 Authentication

**Base Route**: `/api/v1/auth`

| Method | Route       | Description             | Auth Required |
| ------ | ----------- | ----------------------- | ------------- |
| POST   | `/register` | Register a new user     | No            |
| POST   | `/login`    | Log in with credentials | No            |
| GET    | `/refresh`  | Get new access token    | Yes (cookie)  |
| GET    | `/logoff`   | Log out                 | Yes           |

---

### 📂 Projects

**Base Route**: `/api/v1/projects`

| Method | Route         | Description           | Auth         |
| ------ | ------------- | --------------------- | ------------ |
| POST   | `/`           | Create project        | Admin only   |
| PUT    | `/:projectId` | Update project        | Admin only   |
| DELETE | `/:projectId` | Deactivate project    | Admin only   |
| GET    | `/`           | List projects (paged) | Public       |
| GET    | `/:projectId` | Get project by ID     | Public/Admin |
| GET    | `/slug/:slug` | Get project by slug   | Public/Admin |

---

### 📝 Posts

**Base Route**: `/api/v1/posts`

| Method | Route         | Description            | Auth         |
| ------ | ------------- | ---------------------- | ------------ |
| POST   | `/`           | Create new post        | Admin only   |
| PUT    | `/:postId`    | Update post            | Admin only   |
| DELETE | `/:postId`    | Soft delete post       | Admin only   |
| GET    | `/`           | List posts (paginated) | Public       |
| GET    | `/:postId`    | Get post by ID         | Public/Admin |
| GET    | `/slug/:slug` | Get post by slug       | Public/Admin |

**Notes**:

- `content` must be HTML or markdown string
- `coverImageId` is optional and must reference a valid uploaded file
- `tags` is an array of tag IDs
- `isPublished` and `isFeatured` are boolean flags
- Pagination supports `pageIndex`, `pageSize`, `term`, `tags`, and `isFeatured`

---

### 🏷 Tags

**Base Route**: `/api/v1/tags`

| Method | Route     | Description          | Auth         |
| ------ | --------- | -------------------- | ------------ |
| POST   | `/`       | Create a tag         | Admin only   |
| PUT    | `/:tagId` | Update tag name      | Admin only   |
| DELETE | `/:tagId` | Deactivate tag       | Admin only   |
| GET    | `/`       | List all active tags | Public       |
| GET    | `/:tagId` | Get tag by ID        | Public/Admin |

**Notes**:

- Tags are referenced by ID in posts and projects
- Tag names must be unique and are case-insensitive
- Deactivating a tag prevents it from being shown but does not delete it from existing posts/projects

---

### 🗃 Uploads

**Base Route**: `/api/v1/uploads`

| Method | Route      | Description        | Auth       |
| ------ | ---------- | ------------------ | ---------- |
| POST   | `/`        | Upload image file  | Admin only |
| GET    | `/:fileId` | Get file by ID     | Public     |
| GET    | `/`        | List files (paged) | Admin only |
| DELETE | `/:fileId` | Soft delete file   | Admin only |

- Uploads use `multipart/form-data` with the file field named `image`
- Files are stored in object storage and logged in the database

---

### 👤 Users

**Base Route**: `/api/v1/users`

| Method | Route      | Description                   | Auth         |
| ------ | ---------- | ----------------------------- | ------------ |
| PUT    | `/:userId` | Update profile or password    | Owner/Admin  |
| GET    | `/:userId` | Get user profile              | Public/Admin |
| GET    | `/`        | List users (searchable)       | Admin only   |
| DELETE | `/:userId` | Deactivate user + all content | Admin only   |

---

### 🛡 Roles

- **USER**: Can update own profile, view public data
- **ADMIN**: Full access (users, projects, uploads)

---

### 🔄 Pagination & Search

- Supports `pageIndex` and `pageSize` for pagination
- Supports filtering by `term`, `tags`, `name`, and user fields

---

### ✅ Validation

- All inputs validated with Zod
- Passwords must be 8–16 characters and include one letter, one number, and one special character

---

### 📝 Logging

- Structured logging using Pino
- Request logs include IP, method, route, and user ID

---

### 🧪 Local Development

#### 1. Install dependencies

Here’s the corrected, copyable Markdown section with proper formatting:

````md
### 🧪 Local Development

#### 1. Install dependencies

```bash
npm install
```
````

#### 2. Set up environment

Create a `.env` file in the root directory with the following content:

```
DATABASE_URL=postgres://user:pass@localhost:5432/db
JWT_ACCESS_SECRET=your-access-secret
JWT_REFRESH_SECRET=your-refresh-secret
NODE_ENV=development
```

#### 3. Run the server

```bash
npm run dev
```

---

### 📁 Folder Structure

```
/src
  /auth
  /users
  /projects
  /uploads
  /posts
  /tags
  /middleware
  /utils
```

---

### 📬 Contact

Maintained by Jeremy Barber
[LinkedIn](https://linkedin.com/in/jeremydanielbarber)
