# Work In Progresss
## 🖥 Frontend

The frontend is built with **Next.js (App Router)** using **TypeScript** and **Tailwind CSS**, styled with **shadcn/ui** components (plus custom styling).

Key features:

- **React Query** for data fetching and caching
- **React Hook Form** for form management
- **Server Actions** (used only for the contact form)
- API integration for all other data interactions
- Prefetching and hydration for project/post listings and featured content

![Portfolio](./1.png)
![Portfolio](./2.png)

---

## 🧠 Portfolio Backend API

This backend REST API powers the Portfolio Platform, managing users, projects, uploads, posts, tags, and authentication.

Built with:

- Node.js + Express.js
- TypeScript
- PostgreSQL (via Prisma ORM)
- JWT (access + refresh tokens)
- Argon2 password hashing
- AWS S3 / Linode object storage
- Zod for validation
- Multer for uploads
- Pino for structured logging

---

### 🔐 Authentication

**Base Route**: `/api/v1/auth`

| Method | Route       | Description          | Auth Required |
| ------ | ----------- | -------------------- | ------------- |
| POST   | `/register` | Register a new user  | No            |
| POST   | `/login`    | Log in               | No            |
| GET    | `/refresh`  | Refresh access token | Yes (cookie)  |
| GET    | `/logoff`   | Log out              | Yes           |

---

### 📂 Projects

**Base Route**: `/api/v1/projects`

| Method | Route         | Description         | Auth         |
| ------ | ------------- | ------------------- | ------------ |
| POST   | `/`           | Create project      | Admin only   |
| PUT    | `/:projectId` | Update project      | Admin only   |
| DELETE | `/:projectId` | Deactivate project  | Admin only   |
| GET    | `/`           | List projects       | Public       |
| GET    | `/:projectId` | Get project by ID   | Public/Admin |
| GET    | `/slug/:slug` | Get project by slug | Public/Admin |

---

### 📝 Posts

**Base Route**: `/api/v1/posts`

| Method | Route                     | Description              | Auth         |
| ------ | ------------------------- | ------------------------ | ------------ |
| POST   | `/`                       | Create post              | Admin only   |
| PUT    | `/:postId`                | Update post              | Admin only   |
| DELETE | `/:postId`                | Soft delete post         | Admin only   |
| GET    | `/`                       | List posts               | Public       |
| GET    | `/:postId`                | Get post by ID           | Public/Admin |
| GET    | `/slug/:slug`             | Get post by slug         | Public/Admin |
| PATCH  | `/:postId/toggle-feature` | Toggle post as featured  | Admin only   |
| PATCH  | `/:postId/toggle-publish` | Toggle post as published | Admin only   |

**Notes**:

- `content` HTML from tiptap editor
- `coverImageId` must point to a valid uploaded file
- `tags` is an array of tag IDs
- `GET /` supports pagination and filters:
  - `pageIndex`, `pageSize` – for pagination
  - `term` – keyword search in title/excerpt
  - `tags` – comma-separated tag IDs
  - `isFeatured` – `"true"` or `"false"`
  - `sortKey`, `sortOrder` – for sorting results (e.g. `publishDate` or `title`)

---

### 🏷 Tags

**Base Route**: `/api/v1/tags`

| Method | Route     | Description      | Auth       |
| ------ | --------- | ---------------- | ---------- |
| POST   | `/`       | Create tag       | Admin only |
| PUT    | `/:tagId` | Update tag       | Admin only |
| DELETE | `/:tagId` | Deactivate tag   | Admin only |
| GET    | `/`       | List active tags | Public     |
| GET    | `/:tagId` | Get tag by ID    | Public     |

---

### 🗃 Uploads

**Base Route**: `/api/v1/uploads`

| Method | Route      | Description         | Auth       |
| ------ | ---------- | ------------------- | ---------- |
| POST   | `/`        | Upload image file   | Admin only |
| GET    | `/:fileId` | Get file metadata   | Public     |
| GET    | `/`        | List uploaded files | Admin only |
| DELETE | `/:fileId` | Soft delete file    | Admin only |

- Uses `multipart/form-data` with a file field named `image`
- Files are stored in S3-compatible object storage

---

### 👤 Users

**Base Route**: `/api/v1/users`

| Method | Route      | Description               | Auth         |
| ------ | ---------- | ------------------------- | ------------ |
| PUT    | `/:userId` | Update profile            | Owner/Admin  |
| GET    | `/:userId` | Get user info             | Public/Admin |
| GET    | `/`        | List users                | Admin only   |
| DELETE | `/:userId` | Deactivate user + content | Admin only   |

---

### 🛡 Roles

- `USER`: can update own profile and view public data
- `ADMIN`: full access (users, posts, projects, uploads)

---

### 🔄 Pagination & Search

- `pageIndex` and `pageSize` supported
- Filterable by `term`, `tags`, `name`, `email`, etc.

---

### ✅ Validation

- Input validation via Zod
- Passwords must be 8–16 characters with at least one letter, number, and special character

---

### 📝 Logging

- Uses Pino for structured logging
- Logs include method, route, IP, and user ID

---

### 🧪 Local Development

#### 1. Install dependencies

```bash
npm install
```

#### 2. Set up environment

Create a `.env` file in the root with:

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

Maintained by **Jeremy Barber**
[LinkedIn](https://linkedin.com/in/jeremydanielbarber)
