# Portfolio CMS

A full-stack portfolio content management system built with Next.js, Express, Prisma, and MariaDB.

## 🚀 Features

- Next.js frontend with App Router and React Query
- Express.js REST API (Node + TypeScript)
- Prisma ORM with MariaDB
- JWT-based auth with HTTP-only refresh tokens
- Role-based access (Admin, User)
- Zod validation on frontend and backend
- File uploads with S3-compatible storage
- Post and project tagging system
- Admin panel with featured/published toggles
- Dockerized (frontend, backend, database)
- HTTPS support via NGINX + Certbot (for deployment, in progress)

## 🛠 API Overview

- **Auth**: register, login, refresh, logout
- **Users**: get/update profile, list users (admin)
- **Posts**: create, update, delete, list, filter, toggle publish/feature
- **Projects**: create, update, delete, list, get by slug
- **Tags**: create, update, delete, list
- **Uploads**: image upload, metadata, soft delete
