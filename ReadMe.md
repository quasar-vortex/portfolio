# Portfolio Site

## API Features, Roles and Access

### Roles

- Public
- Author
- Admin

### API Features

- Authentication
  - Register (public)
  - Sign In (public)
  - Refresh (authenticated)
  - Sign Out (authenticated)
- Tags
  - Create tag (author,admin)
  - Get all tags (public) - search by name
  - Update tag name (admin)
  - Delete tag (admin)
  - Get posts by tags (public)
  - Get projects by tags (public)
- Posts
  - Create post (author, admin)
  - Get all posts (public) - search by title and excerpt text
  - Edit post (author, admin) - admin can only set inactive flag for posts.
  - Publish post (author)
  - Set post inactive (admin)
  - Delete post (admin, author)
  - Get post by slug (public)
  - Get post by id (public)
  - Get featured posts (public)
  - Set featured post (admin)
- Post Tags
  - Add tag to post (author, admin)
  - Remove tag from post (author, admin) - author can only remove tag from own post
  - Get all tags for a post (public)
- Projects
  - Create project (admin)
  - Get all projects (public)
  - Edit project (admin)
  - Delete project (admin)
  - Get project by id (public)
  - Get featured projects (public)
  - Set featured projects (admin)
- Project Tags
  - Add tag to project (admin)
  - Remove tag from project (admin)
  - Get all tags for a project (public)
- Files
  - Upload file (author, admin)
  - Download file (public)
  - Delete file (admin, author)
- Users
  - Upload avatar file (author, admin)
  - Update profile info (author)
  - Get user by id (public)
  - Get all users (admin)
  - Get posts by user (public)
  - Set user to inactive (admin)

## Pages

- Landing
  - Hero section with intro
  - About section with personal details and skills
  - Projects section with featured projects
  - Blog section with featured blog posts
  - Contact section with form
- Blog
  - List of all blog posts with pagination
  - Individual post page with related posts (find posts with same tags)
- Project
  - List of all projects with pagination
  - Individual project page with details and related projects
- About
  - Personal details and skills
  - Resume/CV download link
- Contact
  - Form for feedback or inquiries

## Database Schema

### User Table

- id varchar(36) uuid
- firstName varchar(20)
- lastName varchar(20)
- email unique varchar(50)
- passwordHash varchar(255)
- refreshToken unique nullable varchar(255)
- bio nullable varchar(250)
- isActive boolean default(true)
- avatarFileId nullable varchar(36)
- registeredAt datetime default(now())
- lastLoginAt nullable datetime
- role enum(USER, ADMIN) default(USER)

### File Table

- id varchar(36) uuid
- originalName varchar(100)
- url varchar(255)
- key varchar(255)
- size int
- createdAt datetime default(now())
- updatedAt nullable datetime
- fileType enum(IMAGE, VIDEO, AUDIO) default(IMAGE)
- uploaderId varchar(36)

### Post Table

- id varchar(36) uuid
- title unique varchar(100)
- slug unique varchar(100)
- excerpt nullable varchar(250)
- content text
- dateCreated datetime default(now())
- dateUpdated nullable datetime
- publishDate nullable datetime
- isPublished boolean default(false)
- coverImageId nullable varchar(36)
- authorId varchar(36)
- isFeatured boolean default(false)

### Tag Table

- id varchar(36) uuid
- name unique varchar(50)

### PostTag Table

- postId varchar(36)
- tagId varchar(36)
- primary key (tagId, postId)

### PostView Table

- id varchar(36) uuid
- postId varchar(36)
- ipAddress varchar(39) // Supports IPv6
- date date
- unique (date, ipAddress)

### Project Table

- id varchar(36) uuid
- title unique varchar(100)
- slug unique varchar(100)
- description varchar(250)
- coverImageId nullable varchar(36)
- authorId varchar(36)
- isPublished boolean default(false)
- dateCreated datetime default(now())
- dateUpdated nullable datetime
- publishDate nullable datetime
- productionUrl varchar(255)
- codeUrl varchar(255)
- isFeatured boolean default(false)

### ProjectTag Table

- projectId varchar(36)
- tagId varchar(36)
- primary key (tagId, projectId)

### Relationships

- **User ↔ File** (One-to-Many) - A user can upload multiple files.
- **User ↔ Post** (One-to-Many) - A user can author multiple posts.
- **User ↔ Project** (One-to-Many) - A user can author multiple projects.
- **Post ↔ File** (One-to-One) - A post can have one cover image.
- **Post ↔ Tag** (Many-to-Many) - Posts can have multiple tags.
- **Project ↔ Tag** (Many-to-Many) - Projects can have multiple tags.
- **Post ↔ PostView** (One-to-Many) - A post can have multiple views.
