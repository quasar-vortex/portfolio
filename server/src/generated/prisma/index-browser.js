
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.FileScalarFieldEnum = {
  id: 'id',
  originalName: 'originalName',
  size: 'size',
  url: 'url',
  objectKey: 'objectKey',
  fileType: 'fileType',
  dateUploaded: 'dateUploaded',
  dateUpdated: 'dateUpdated',
  isActive: 'isActive',
  updatedById: 'updatedById',
  userId: 'userId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  passwordHash: 'passwordHash',
  registeredDate: 'registeredDate',
  lastLoginDate: 'lastLoginDate',
  refreshToken: 'refreshToken',
  role: 'role',
  bio: 'bio',
  avatarFileId: 'avatarFileId',
  isActive: 'isActive',
  updatedById: 'updatedById',
  dateUpdated: 'dateUpdated'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  excerpt: 'excerpt',
  content: 'content',
  isPublished: 'isPublished',
  isFeatured: 'isFeatured',
  isActive: 'isActive',
  publishDate: 'publishDate',
  createdDate: 'createdDate',
  updatedDate: 'updatedDate',
  coverImageId: 'coverImageId',
  authorId: 'authorId',
  updatedById: 'updatedById'
};

exports.Prisma.PostTagScalarFieldEnum = {
  postId: 'postId',
  tagId: 'tagId'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  content: 'content',
  coverImageId: 'coverImageId',
  isPublished: 'isPublished',
  isFeatured: 'isFeatured',
  publishDate: 'publishDate',
  createdDate: 'createdDate',
  updatedDate: 'updatedDate',
  isActive: 'isActive',
  authorId: 'authorId',
  codeUrl: 'codeUrl',
  liveUrl: 'liveUrl',
  updatedById: 'updatedById'
};

exports.Prisma.ProjectTagScalarFieldEnum = {
  projectId: 'projectId',
  tagId: 'tagId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.FileOrderByRelevanceFieldEnum = {
  id: 'id',
  originalName: 'originalName',
  url: 'url',
  objectKey: 'objectKey',
  updatedById: 'updatedById',
  userId: 'userId'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  passwordHash: 'passwordHash',
  refreshToken: 'refreshToken',
  bio: 'bio',
  avatarFileId: 'avatarFileId',
  updatedById: 'updatedById'
};

exports.Prisma.TagOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PostOrderByRelevanceFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  excerpt: 'excerpt',
  content: 'content',
  coverImageId: 'coverImageId',
  authorId: 'authorId',
  updatedById: 'updatedById'
};

exports.Prisma.PostTagOrderByRelevanceFieldEnum = {
  postId: 'postId',
  tagId: 'tagId'
};

exports.Prisma.ProjectOrderByRelevanceFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  description: 'description',
  content: 'content',
  coverImageId: 'coverImageId',
  authorId: 'authorId',
  codeUrl: 'codeUrl',
  liveUrl: 'liveUrl',
  updatedById: 'updatedById'
};

exports.Prisma.ProjectTagOrderByRelevanceFieldEnum = {
  projectId: 'projectId',
  tagId: 'tagId'
};
exports.FileType = exports.$Enums.FileType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

exports.Prisma.ModelName = {
  File: 'File',
  User: 'User',
  Tag: 'Tag',
  Post: 'Post',
  PostTag: 'PostTag',
  Project: 'Project',
  ProjectTag: 'ProjectTag'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
