export type CreatePostModel = {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  isPublished: boolean;
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
  name?: string | undefined;
  pageIndex?: number | undefined;
  pageSize?: number | undefined;
};

export type Tag = { id: string; name: string };
