export type CreatePostModel = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  isPublished?: boolean;
  isFeatured?: boolean;
  coverImageId?: string;
};

export type UpdatePostModel = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  isFeatured?: boolean;
  coverImageId?: string;
};

export type SearchPostsModel = {
  term?: string;
  tags?: string[];
  pageIndex?: number;
  pageSize?: number;
  isFeatured?: boolean;
  sortOrder?: "asc" | "desc";
  sortKey?: "publishDate" | "title";
};

export type PostTag = {
  postId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
};

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  avatarFile: {
    id: string;
    url: string;
  };
};

export type CoverImage = {
  id: string;
  url: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishDate: string;
  PostTag: PostTag[];
  author: Author;
  coverImage: CoverImage;
  isActive?: boolean;
  isFeatured?: boolean;
};

export type PostMeta = {
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  isFeatured: boolean;
};

export type FeaturedPostResponse = {
  data: Post[];
  message: string;
  meta: PostMeta;
};

export type CreateProjectModel = {
  title: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  description: string;
  coverImageId?: string | undefined;
  codeUrl?: string | undefined;
  liveUrl?: string | undefined;
};
export type UpdateProjectModel = {
  title: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  description: string;
  coverImageId?: string | undefined;
  codeUrl?: string | undefined;
  liveUrl?: string | undefined;
};

export type SearchProjectsModel = {
  tags?: string[];
  isFeatured?: boolean;
  term?: string | undefined;
  pageIndex?: number;
  pageSize?: number;
  sortOrder?: "asc" | "desc";
  sortKey?: "title" | "publishDate";
};

export type DbFile = {
  id: string;
  url: string;
  fileType: "IMAGE";
  dateUploaded: Date;
  dateUpdated: Date;
  originalName: string;
};

export type AdminFile = DbFile & {
  isActive: boolean;
  objectKey: string;
  size: number;
  userId: string;
};

export type SearchFilesModel = {
  name?: string;
  pageIndex?: number;
  pageSize?: number;
  sortOrder?: "asc" | "desc";
  sortKey?: "publishDate" | "name";
};

export type SearchTagsModel = {
  term?: string | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
};

export type Tag = { id: string; name: string };

type File = {
  id: string;
  url: string;
};

export type BasePost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  publishDate: Date | string;
  PostTag: PostTag[];
  author: Author;
  coverImage: File | null;
};

export type AdminPost = BasePost & {
  isActive: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  createdDate: Date | string;
  updatedDate: Date | string;
  updatedById: string | null;
};

export type ProjectTag = {
  projectId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
};

export type ProjectAuthor = {
  id: string;
  firstName: string;
  lastName: string;
  avatarFile: {
    id: string;
    url: string;
  };
};

export type ProjectCoverImage = {
  id: string;
  url: string;
};

export type BaseProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  publishDate: string | Date;
  isPublished: boolean;
  isFeatured: boolean;
  codeUrl?: string;
  liveUrl?: string;
  ProjectTag: ProjectTag[];
  author: ProjectAuthor;
  coverImage: ProjectCoverImage | null;
};

export type AdminProject = BaseProject & {
  isActive: boolean;
  createdDate: string | Date;
  updatedDate: string | Date;
  updatedById: string | null;
  updatedBy?: ProjectAuthor;
};

export type Project = BaseProject;

export type ProjectMeta = {
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  isFeatured: boolean;
};

export type FeaturedProjectResponse = {
  data: Project[];
  message: string;
  meta: ProjectMeta;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bio: string | null;
  avatarFile: {
    id: string;
    url: string;
  } | null;
  isActive: boolean;
  lastLoginDate: string | null;
  registeredDate: string;
};
export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  bio: string | null;
  avatarFile: {
    id: string;
    url: string;
  } | null;
  isActive: boolean;
  lastLoginDate: string | null;
  registeredDate: string;
};
export type UpdateUserPayload = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  avatarFileId: string;
  currentPassword: string;
  newPassword: string;
  role: string;
}>;

export type SearchUsersPayload = Partial<{
  pageIndex: number;
  pageSize: number;
  firstName: string;
  lastName: string;
  email: string;
}>;

export type PaginatedUserResponse = {
  data: AdminUser[];
  meta: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
  };
};
