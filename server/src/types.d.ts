import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
export type CustomRequestHandler = (
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) => void;

export type S3UploadedFile = {
  size: number; // Size of the file in bytes
  bucket: string; // The S3 bucket name where the file is stored
  key: string; // The unique filename in S3
  acl?: string; // Access control level (optional)
  contentType: string; // The MIME type of the uploaded file
  metadata?: Record<string, string>; // Metadata object sent to S3
  location: string; // The S3 URL to access the file
  etag?: string; // Entity tag (ETag) assigned by S3
  contentDisposition?: string; // Content disposition (optional)
  storageClass?: string; // Storage class in S3 (e.g., STANDARD, GLACIER)
  versionId?: string; // Version ID (if versioning is enabled)
  contentEncoding?: string; // Encoding used during upload (optional)
} & Express.Multer.File;

export type PublicUser = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  registeredAt: Date;
  lastLoginAt: Date | null;
  role: User["role"];
  avatarUrl: string | null;
};
