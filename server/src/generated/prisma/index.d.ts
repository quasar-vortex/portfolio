
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model File
 * 
 */
export type File = $Result.DefaultSelection<Prisma.$FilePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostTag
 * 
 */
export type PostTag = $Result.DefaultSelection<Prisma.$PostTagPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectTag
 * 
 */
export type ProjectTag = $Result.DefaultSelection<Prisma.$ProjectTagPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const FileType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type FileType = (typeof FileType)[keyof typeof FileType]


export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type FileType = $Enums.FileType

export const FileType: typeof $Enums.FileType

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Files
 * const files = await prisma.file.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Files
   * const files = await prisma.file.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postTag`: Exposes CRUD operations for the **PostTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostTags
    * const postTags = await prisma.postTag.findMany()
    * ```
    */
  get postTag(): Prisma.PostTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectTag`: Exposes CRUD operations for the **ProjectTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectTags
    * const projectTags = await prisma.projectTag.findMany()
    * ```
    */
  get projectTag(): Prisma.ProjectTagDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    File: 'File',
    User: 'User',
    Tag: 'Tag',
    Post: 'Post',
    PostTag: 'PostTag',
    Project: 'Project',
    ProjectTag: 'ProjectTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "file" | "user" | "tag" | "post" | "postTag" | "project" | "projectTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      File: {
        payload: Prisma.$FilePayload<ExtArgs>
        fields: Prisma.FileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findFirst: {
            args: Prisma.FileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findMany: {
            args: Prisma.FileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          create: {
            args: Prisma.FileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          createMany: {
            args: Prisma.FileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.FileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          update: {
            args: Prisma.FileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          deleteMany: {
            args: Prisma.FileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          aggregate: {
            args: Prisma.FileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFile>
          }
          groupBy: {
            args: Prisma.FileGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileCountArgs<ExtArgs>
            result: $Utils.Optional<FileCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostTag: {
        payload: Prisma.$PostTagPayload<ExtArgs>
        fields: Prisma.PostTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          findFirst: {
            args: Prisma.PostTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          findMany: {
            args: Prisma.PostTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>[]
          }
          create: {
            args: Prisma.PostTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          createMany: {
            args: Prisma.PostTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          update: {
            args: Prisma.PostTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          deleteMany: {
            args: Prisma.PostTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostTagPayload>
          }
          aggregate: {
            args: Prisma.PostTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostTag>
          }
          groupBy: {
            args: Prisma.PostTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostTagCountArgs<ExtArgs>
            result: $Utils.Optional<PostTagCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectTag: {
        payload: Prisma.$ProjectTagPayload<ExtArgs>
        fields: Prisma.ProjectTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          findFirst: {
            args: Prisma.ProjectTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          findMany: {
            args: Prisma.ProjectTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>[]
          }
          create: {
            args: Prisma.ProjectTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          createMany: {
            args: Prisma.ProjectTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProjectTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          update: {
            args: Prisma.ProjectTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          deleteMany: {
            args: Prisma.ProjectTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProjectTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectTagPayload>
          }
          aggregate: {
            args: Prisma.ProjectTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectTag>
          }
          groupBy: {
            args: Prisma.ProjectTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectTagCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    file?: FileOmit
    user?: UserOmit
    tag?: TagOmit
    post?: PostOmit
    postTag?: PostTagOmit
    project?: ProjectOmit
    projectTag?: ProjectTagOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FileCountOutputType
   */

  export type FileCountOutputType = {
    User: number
    Post: number
    Project: number
  }

  export type FileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | FileCountOutputTypeCountUserArgs
    Post?: boolean | FileCountOutputTypeCountPostArgs
    Project?: boolean | FileCountOutputTypeCountProjectArgs
  }

  // Custom InputTypes
  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileCountOutputType
     */
    select?: FileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeCountPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeCountProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    PostAuthor: number
    ProjectAuthor: number
    File: number
    PostUpdater: number
    ProjectUpdater: number
    Tag: number
    FileU: number
    User: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PostAuthor?: boolean | UserCountOutputTypeCountPostAuthorArgs
    ProjectAuthor?: boolean | UserCountOutputTypeCountProjectAuthorArgs
    File?: boolean | UserCountOutputTypeCountFileArgs
    PostUpdater?: boolean | UserCountOutputTypeCountPostUpdaterArgs
    ProjectUpdater?: boolean | UserCountOutputTypeCountProjectUpdaterArgs
    Tag?: boolean | UserCountOutputTypeCountTagArgs
    FileU?: boolean | UserCountOutputTypeCountFileUArgs
    User?: boolean | UserCountOutputTypeCountUserArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostUpdaterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectUpdaterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFileUArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    PostTag: number
    ProjectTag: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PostTag?: boolean | TagCountOutputTypeCountPostTagArgs
    ProjectTag?: boolean | TagCountOutputTypeCountProjectTagArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountPostTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountProjectTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTagWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    PostTag: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PostTag?: boolean | PostCountOutputTypeCountPostTagArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountPostTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    ProjectTag: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ProjectTag?: boolean | ProjectCountOutputTypeCountProjectTagArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountProjectTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model File
   */

  export type AggregateFile = {
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  export type FileAvgAggregateOutputType = {
    size: number | null
  }

  export type FileSumAggregateOutputType = {
    size: number | null
  }

  export type FileMinAggregateOutputType = {
    id: string | null
    originalName: string | null
    size: number | null
    url: string | null
    objectKey: string | null
    fileType: $Enums.FileType | null
    dateUploaded: Date | null
    dateUpdated: Date | null
    isActive: boolean | null
    updatedById: string | null
    userId: string | null
  }

  export type FileMaxAggregateOutputType = {
    id: string | null
    originalName: string | null
    size: number | null
    url: string | null
    objectKey: string | null
    fileType: $Enums.FileType | null
    dateUploaded: Date | null
    dateUpdated: Date | null
    isActive: boolean | null
    updatedById: string | null
    userId: string | null
  }

  export type FileCountAggregateOutputType = {
    id: number
    originalName: number
    size: number
    url: number
    objectKey: number
    fileType: number
    dateUploaded: number
    dateUpdated: number
    isActive: number
    updatedById: number
    userId: number
    _all: number
  }


  export type FileAvgAggregateInputType = {
    size?: true
  }

  export type FileSumAggregateInputType = {
    size?: true
  }

  export type FileMinAggregateInputType = {
    id?: true
    originalName?: true
    size?: true
    url?: true
    objectKey?: true
    fileType?: true
    dateUploaded?: true
    dateUpdated?: true
    isActive?: true
    updatedById?: true
    userId?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    originalName?: true
    size?: true
    url?: true
    objectKey?: true
    fileType?: true
    dateUploaded?: true
    dateUpdated?: true
    isActive?: true
    updatedById?: true
    userId?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    originalName?: true
    size?: true
    url?: true
    objectKey?: true
    fileType?: true
    dateUploaded?: true
    dateUpdated?: true
    isActive?: true
    updatedById?: true
    userId?: true
    _all?: true
  }

  export type FileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which File to aggregate.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
        [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }




  export type FileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
    orderBy?: FileOrderByWithAggregationInput | FileOrderByWithAggregationInput[]
    by: FileScalarFieldEnum[] | FileScalarFieldEnum
    having?: FileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileCountAggregateInputType | true
    _avg?: FileAvgAggregateInputType
    _sum?: FileSumAggregateInputType
    _min?: FileMinAggregateInputType
    _max?: FileMaxAggregateInputType
  }

  export type FileGroupByOutputType = {
    id: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType: $Enums.FileType
    dateUploaded: Date
    dateUpdated: Date | null
    isActive: boolean
    updatedById: string | null
    userId: string
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  type GetFileGroupByPayload<T extends FileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileGroupByOutputType[P]>
            : GetScalarType<T[P], FileGroupByOutputType[P]>
        }
      >
    >


  export type FileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    originalName?: boolean
    size?: boolean
    url?: boolean
    objectKey?: boolean
    fileType?: boolean
    dateUploaded?: boolean
    dateUpdated?: boolean
    isActive?: boolean
    updatedById?: boolean
    userId?: boolean
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | File$updatedByArgs<ExtArgs>
    User?: boolean | File$UserArgs<ExtArgs>
    Post?: boolean | File$PostArgs<ExtArgs>
    Project?: boolean | File$ProjectArgs<ExtArgs>
    _count?: boolean | FileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>



  export type FileSelectScalar = {
    id?: boolean
    originalName?: boolean
    size?: boolean
    url?: boolean
    objectKey?: boolean
    fileType?: boolean
    dateUploaded?: boolean
    dateUpdated?: boolean
    isActive?: boolean
    updatedById?: boolean
    userId?: boolean
  }

  export type FileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "originalName" | "size" | "url" | "objectKey" | "fileType" | "dateUploaded" | "dateUpdated" | "isActive" | "updatedById" | "userId", ExtArgs["result"]["file"]>
  export type FileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploader?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | File$updatedByArgs<ExtArgs>
    User?: boolean | File$UserArgs<ExtArgs>
    Post?: boolean | File$PostArgs<ExtArgs>
    Project?: boolean | File$ProjectArgs<ExtArgs>
    _count?: boolean | FileCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $FilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "File"
    objects: {
      uploader: Prisma.$UserPayload<ExtArgs>
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs>[]
      Post: Prisma.$PostPayload<ExtArgs>[]
      Project: Prisma.$ProjectPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      originalName: string
      size: number
      url: string
      objectKey: string
      fileType: $Enums.FileType
      dateUploaded: Date
      dateUpdated: Date | null
      isActive: boolean
      updatedById: string | null
      userId: string
    }, ExtArgs["result"]["file"]>
    composites: {}
  }

  type FileGetPayload<S extends boolean | null | undefined | FileDefaultArgs> = $Result.GetResult<Prisma.$FilePayload, S>

  type FileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileCountAggregateInputType | true
    }

  export interface FileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['File'], meta: { name: 'File' } }
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileFindUniqueArgs>(args: SelectSubset<T, FileFindUniqueArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one File that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileFindUniqueOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileFindUniqueOrThrowArgs>(args: SelectSubset<T, FileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first File that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileFindFirstArgs>(args?: SelectSubset<T, FileFindFirstArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first File that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileFindFirstOrThrowArgs>(args?: SelectSubset<T, FileFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileFindManyArgs>(args?: SelectSubset<T, FileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
     */
    create<T extends FileCreateArgs>(args: SelectSubset<T, FileCreateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Files.
     * @param {FileCreateManyArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileCreateManyArgs>(args?: SelectSubset<T, FileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
     */
    delete<T extends FileDeleteArgs>(args: SelectSubset<T, FileDeleteArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileUpdateArgs>(args: SelectSubset<T, FileUpdateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileDeleteManyArgs>(args?: SelectSubset<T, FileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileUpdateManyArgs>(args: SelectSubset<T, FileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
     */
    upsert<T extends FileUpsertArgs>(args: SelectSubset<T, FileUpsertArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): Prisma.PrismaPromise<GetFileAggregateType<T>>

    /**
     * Group by File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileGroupByArgs['orderBy'] }
        : { orderBy?: FileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the File model
   */
  readonly fields: FileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploader<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends File$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, File$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    User<T extends File$UserArgs<ExtArgs> = {}>(args?: Subset<T, File$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Post<T extends File$PostArgs<ExtArgs> = {}>(args?: Subset<T, File$PostArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Project<T extends File$ProjectArgs<ExtArgs> = {}>(args?: Subset<T, File$ProjectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the File model
   */
  interface FileFieldRefs {
    readonly id: FieldRef<"File", 'String'>
    readonly originalName: FieldRef<"File", 'String'>
    readonly size: FieldRef<"File", 'Int'>
    readonly url: FieldRef<"File", 'String'>
    readonly objectKey: FieldRef<"File", 'String'>
    readonly fileType: FieldRef<"File", 'FileType'>
    readonly dateUploaded: FieldRef<"File", 'DateTime'>
    readonly dateUpdated: FieldRef<"File", 'DateTime'>
    readonly isActive: FieldRef<"File", 'Boolean'>
    readonly updatedById: FieldRef<"File", 'String'>
    readonly userId: FieldRef<"File", 'String'>
  }
    

  // Custom InputTypes
  /**
   * File findUnique
   */
  export type FileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findUniqueOrThrow
   */
  export type FileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findFirst
   */
  export type FileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findFirstOrThrow
   */
  export type FileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findMany
   */
  export type FileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File create
   */
  export type FileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to create a File.
     */
    data: XOR<FileCreateInput, FileUncheckedCreateInput>
  }

  /**
   * File createMany
   */
  export type FileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * File update
   */
  export type FileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to update a File.
     */
    data: XOR<FileUpdateInput, FileUncheckedUpdateInput>
    /**
     * Choose, which File to update.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File updateMany
   */
  export type FileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Files.
     */
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
  }

  /**
   * File upsert
   */
  export type FileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The filter to search for the File to update in case it exists.
     */
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
     */
    create: XOR<FileCreateInput, FileUncheckedCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileUpdateInput, FileUncheckedUpdateInput>
  }

  /**
   * File delete
   */
  export type FileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter which File to delete.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Files to delete
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to delete.
     */
    limit?: number
  }

  /**
   * File.updatedBy
   */
  export type File$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * File.User
   */
  export type File$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * File.Post
   */
  export type File$PostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * File.Project
   */
  export type File$ProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * File without action
   */
  export type FileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    passwordHash: string | null
    registeredDate: Date | null
    lastLoginDate: Date | null
    refreshToken: string | null
    role: $Enums.Role | null
    bio: string | null
    avatarFileId: string | null
    isActive: boolean | null
    updatedById: string | null
    dateUpdated: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    passwordHash: string | null
    registeredDate: Date | null
    lastLoginDate: Date | null
    refreshToken: string | null
    role: $Enums.Role | null
    bio: string | null
    avatarFileId: string | null
    isActive: boolean | null
    updatedById: string | null
    dateUpdated: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    passwordHash: number
    registeredDate: number
    lastLoginDate: number
    refreshToken: number
    role: number
    bio: number
    avatarFileId: number
    isActive: number
    updatedById: number
    dateUpdated: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    passwordHash?: true
    registeredDate?: true
    lastLoginDate?: true
    refreshToken?: true
    role?: true
    bio?: true
    avatarFileId?: true
    isActive?: true
    updatedById?: true
    dateUpdated?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    passwordHash?: true
    registeredDate?: true
    lastLoginDate?: true
    refreshToken?: true
    role?: true
    bio?: true
    avatarFileId?: true
    isActive?: true
    updatedById?: true
    dateUpdated?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    passwordHash?: true
    registeredDate?: true
    lastLoginDate?: true
    refreshToken?: true
    role?: true
    bio?: true
    avatarFileId?: true
    isActive?: true
    updatedById?: true
    dateUpdated?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate: Date
    lastLoginDate: Date | null
    refreshToken: string | null
    role: $Enums.Role
    bio: string | null
    avatarFileId: string | null
    isActive: boolean
    updatedById: string | null
    dateUpdated: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    passwordHash?: boolean
    registeredDate?: boolean
    lastLoginDate?: boolean
    refreshToken?: boolean
    role?: boolean
    bio?: boolean
    avatarFileId?: boolean
    isActive?: boolean
    updatedById?: boolean
    dateUpdated?: boolean
    avatarFile?: boolean | User$avatarFileArgs<ExtArgs>
    updatedBy?: boolean | User$updatedByArgs<ExtArgs>
    PostAuthor?: boolean | User$PostAuthorArgs<ExtArgs>
    ProjectAuthor?: boolean | User$ProjectAuthorArgs<ExtArgs>
    File?: boolean | User$FileArgs<ExtArgs>
    PostUpdater?: boolean | User$PostUpdaterArgs<ExtArgs>
    ProjectUpdater?: boolean | User$ProjectUpdaterArgs<ExtArgs>
    Tag?: boolean | User$TagArgs<ExtArgs>
    FileU?: boolean | User$FileUArgs<ExtArgs>
    User?: boolean | User$UserArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    passwordHash?: boolean
    registeredDate?: boolean
    lastLoginDate?: boolean
    refreshToken?: boolean
    role?: boolean
    bio?: boolean
    avatarFileId?: boolean
    isActive?: boolean
    updatedById?: boolean
    dateUpdated?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "passwordHash" | "registeredDate" | "lastLoginDate" | "refreshToken" | "role" | "bio" | "avatarFileId" | "isActive" | "updatedById" | "dateUpdated", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatarFile?: boolean | User$avatarFileArgs<ExtArgs>
    updatedBy?: boolean | User$updatedByArgs<ExtArgs>
    PostAuthor?: boolean | User$PostAuthorArgs<ExtArgs>
    ProjectAuthor?: boolean | User$ProjectAuthorArgs<ExtArgs>
    File?: boolean | User$FileArgs<ExtArgs>
    PostUpdater?: boolean | User$PostUpdaterArgs<ExtArgs>
    ProjectUpdater?: boolean | User$ProjectUpdaterArgs<ExtArgs>
    Tag?: boolean | User$TagArgs<ExtArgs>
    FileU?: boolean | User$FileUArgs<ExtArgs>
    User?: boolean | User$UserArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      avatarFile: Prisma.$FilePayload<ExtArgs> | null
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
      PostAuthor: Prisma.$PostPayload<ExtArgs>[]
      ProjectAuthor: Prisma.$ProjectPayload<ExtArgs>[]
      File: Prisma.$FilePayload<ExtArgs>[]
      PostUpdater: Prisma.$PostPayload<ExtArgs>[]
      ProjectUpdater: Prisma.$ProjectPayload<ExtArgs>[]
      Tag: Prisma.$TagPayload<ExtArgs>[]
      FileU: Prisma.$FilePayload<ExtArgs>[]
      User: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      passwordHash: string
      registeredDate: Date
      lastLoginDate: Date | null
      refreshToken: string | null
      role: $Enums.Role
      bio: string | null
      avatarFileId: string | null
      isActive: boolean
      updatedById: string | null
      dateUpdated: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avatarFile<T extends User$avatarFileArgs<ExtArgs> = {}>(args?: Subset<T, User$avatarFileArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends User$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, User$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    PostAuthor<T extends User$PostAuthorArgs<ExtArgs> = {}>(args?: Subset<T, User$PostAuthorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ProjectAuthor<T extends User$ProjectAuthorArgs<ExtArgs> = {}>(args?: Subset<T, User$ProjectAuthorArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    File<T extends User$FileArgs<ExtArgs> = {}>(args?: Subset<T, User$FileArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PostUpdater<T extends User$PostUpdaterArgs<ExtArgs> = {}>(args?: Subset<T, User$PostUpdaterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ProjectUpdater<T extends User$ProjectUpdaterArgs<ExtArgs> = {}>(args?: Subset<T, User$ProjectUpdaterArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Tag<T extends User$TagArgs<ExtArgs> = {}>(args?: Subset<T, User$TagArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    FileU<T extends User$FileUArgs<ExtArgs> = {}>(args?: Subset<T, User$FileUArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    User<T extends User$UserArgs<ExtArgs> = {}>(args?: Subset<T, User$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly registeredDate: FieldRef<"User", 'DateTime'>
    readonly lastLoginDate: FieldRef<"User", 'DateTime'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly bio: FieldRef<"User", 'String'>
    readonly avatarFileId: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly updatedById: FieldRef<"User", 'String'>
    readonly dateUpdated: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.avatarFile
   */
  export type User$avatarFileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
  }

  /**
   * User.updatedBy
   */
  export type User$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * User.PostAuthor
   */
  export type User$PostAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.ProjectAuthor
   */
  export type User$ProjectAuthorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.File
   */
  export type User$FileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * User.PostUpdater
   */
  export type User$PostUpdaterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.ProjectUpdater
   */
  export type User$ProjectUpdaterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.Tag
   */
  export type User$TagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * User.FileU
   */
  export type User$FileUArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * User.User
   */
  export type User$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    authorId: string | null
    isActive: boolean | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    authorId: string | null
    isActive: boolean | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    authorId: number
    isActive: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    authorId?: true
    isActive?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    authorId?: true
    isActive?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    authorId?: true
    isActive?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    authorId: string
    isActive: boolean
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    authorId?: boolean
    isActive?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    PostTag?: boolean | Tag$PostTagArgs<ExtArgs>
    ProjectTag?: boolean | Tag$ProjectTagArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>



  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    authorId?: boolean
    isActive?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "authorId" | "isActive", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    PostTag?: boolean | Tag$PostTagArgs<ExtArgs>
    ProjectTag?: boolean | Tag$ProjectTagArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      PostTag: Prisma.$PostTagPayload<ExtArgs>[]
      ProjectTag: Prisma.$ProjectTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      authorId: string
      isActive: boolean
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    PostTag<T extends Tag$PostTagArgs<ExtArgs> = {}>(args?: Subset<T, Tag$PostTagArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ProjectTag<T extends Tag$ProjectTagArgs<ExtArgs> = {}>(args?: Subset<T, Tag$ProjectTagArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly authorId: FieldRef<"Tag", 'String'>
    readonly isActive: FieldRef<"Tag", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.PostTag
   */
  export type Tag$PostTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    where?: PostTagWhereInput
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    cursor?: PostTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * Tag.ProjectTag
   */
  export type Tag$ProjectTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    where?: ProjectTagWhereInput
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    cursor?: ProjectTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    excerpt: string | null
    content: string | null
    isPublished: boolean | null
    isFeatured: boolean | null
    isActive: boolean | null
    publishDate: Date | null
    createdDate: Date | null
    updatedDate: Date | null
    coverImageId: string | null
    authorId: string | null
    updatedById: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    excerpt: string | null
    content: string | null
    isPublished: boolean | null
    isFeatured: boolean | null
    isActive: boolean | null
    publishDate: Date | null
    createdDate: Date | null
    updatedDate: Date | null
    coverImageId: string | null
    authorId: string | null
    updatedById: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    excerpt: number
    content: number
    isPublished: number
    isFeatured: number
    isActive: number
    publishDate: number
    createdDate: number
    updatedDate: number
    coverImageId: number
    authorId: number
    updatedById: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    content?: true
    isPublished?: true
    isFeatured?: true
    isActive?: true
    publishDate?: true
    createdDate?: true
    updatedDate?: true
    coverImageId?: true
    authorId?: true
    updatedById?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    content?: true
    isPublished?: true
    isFeatured?: true
    isActive?: true
    publishDate?: true
    createdDate?: true
    updatedDate?: true
    coverImageId?: true
    authorId?: true
    updatedById?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    excerpt?: true
    content?: true
    isPublished?: true
    isFeatured?: true
    isActive?: true
    publishDate?: true
    createdDate?: true
    updatedDate?: true
    coverImageId?: true
    authorId?: true
    updatedById?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished: boolean
    isFeatured: boolean
    isActive: boolean
    publishDate: Date | null
    createdDate: Date
    updatedDate: Date | null
    coverImageId: string | null
    authorId: string
    updatedById: string | null
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: boolean
    createdDate?: boolean
    updatedDate?: boolean
    coverImageId?: boolean
    authorId?: boolean
    updatedById?: boolean
    coverImage?: boolean | Post$coverImageArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | Post$updatedByArgs<ExtArgs>
    PostTag?: boolean | Post$PostTagArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>



  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    excerpt?: boolean
    content?: boolean
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: boolean
    createdDate?: boolean
    updatedDate?: boolean
    coverImageId?: boolean
    authorId?: boolean
    updatedById?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "excerpt" | "content" | "isPublished" | "isFeatured" | "isActive" | "publishDate" | "createdDate" | "updatedDate" | "coverImageId" | "authorId" | "updatedById", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coverImage?: boolean | Post$coverImageArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | Post$updatedByArgs<ExtArgs>
    PostTag?: boolean | Post$PostTagArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      coverImage: Prisma.$FilePayload<ExtArgs> | null
      author: Prisma.$UserPayload<ExtArgs>
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
      PostTag: Prisma.$PostTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      excerpt: string
      content: string
      isPublished: boolean
      isFeatured: boolean
      isActive: boolean
      publishDate: Date | null
      createdDate: Date
      updatedDate: Date | null
      coverImageId: string | null
      authorId: string
      updatedById: string | null
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coverImage<T extends Post$coverImageArgs<ExtArgs> = {}>(args?: Subset<T, Post$coverImageArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends Post$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, Post$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    PostTag<T extends Post$PostTagArgs<ExtArgs> = {}>(args?: Subset<T, Post$PostTagArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly slug: FieldRef<"Post", 'String'>
    readonly excerpt: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly isPublished: FieldRef<"Post", 'Boolean'>
    readonly isFeatured: FieldRef<"Post", 'Boolean'>
    readonly isActive: FieldRef<"Post", 'Boolean'>
    readonly publishDate: FieldRef<"Post", 'DateTime'>
    readonly createdDate: FieldRef<"Post", 'DateTime'>
    readonly updatedDate: FieldRef<"Post", 'DateTime'>
    readonly coverImageId: FieldRef<"Post", 'String'>
    readonly authorId: FieldRef<"Post", 'String'>
    readonly updatedById: FieldRef<"Post", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.coverImage
   */
  export type Post$coverImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
  }

  /**
   * Post.updatedBy
   */
  export type Post$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Post.PostTag
   */
  export type Post$PostTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    where?: PostTagWhereInput
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    cursor?: PostTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostTag
   */

  export type AggregatePostTag = {
    _count: PostTagCountAggregateOutputType | null
    _min: PostTagMinAggregateOutputType | null
    _max: PostTagMaxAggregateOutputType | null
  }

  export type PostTagMinAggregateOutputType = {
    postId: string | null
    tagId: string | null
  }

  export type PostTagMaxAggregateOutputType = {
    postId: string | null
    tagId: string | null
  }

  export type PostTagCountAggregateOutputType = {
    postId: number
    tagId: number
    _all: number
  }


  export type PostTagMinAggregateInputType = {
    postId?: true
    tagId?: true
  }

  export type PostTagMaxAggregateInputType = {
    postId?: true
    tagId?: true
  }

  export type PostTagCountAggregateInputType = {
    postId?: true
    tagId?: true
    _all?: true
  }

  export type PostTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTag to aggregate.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostTags
    **/
    _count?: true | PostTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostTagMaxAggregateInputType
  }

  export type GetPostTagAggregateType<T extends PostTagAggregateArgs> = {
        [P in keyof T & keyof AggregatePostTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostTag[P]>
      : GetScalarType<T[P], AggregatePostTag[P]>
  }




  export type PostTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostTagWhereInput
    orderBy?: PostTagOrderByWithAggregationInput | PostTagOrderByWithAggregationInput[]
    by: PostTagScalarFieldEnum[] | PostTagScalarFieldEnum
    having?: PostTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostTagCountAggregateInputType | true
    _min?: PostTagMinAggregateInputType
    _max?: PostTagMaxAggregateInputType
  }

  export type PostTagGroupByOutputType = {
    postId: string
    tagId: string
    _count: PostTagCountAggregateOutputType | null
    _min: PostTagMinAggregateOutputType | null
    _max: PostTagMaxAggregateOutputType | null
  }

  type GetPostTagGroupByPayload<T extends PostTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostTagGroupByOutputType[P]>
            : GetScalarType<T[P], PostTagGroupByOutputType[P]>
        }
      >
    >


  export type PostTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    postId?: boolean
    tagId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postTag"]>



  export type PostTagSelectScalar = {
    postId?: boolean
    tagId?: boolean
  }

  export type PostTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"postId" | "tagId", ExtArgs["result"]["postTag"]>
  export type PostTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $PostTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostTag"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      postId: string
      tagId: string
    }, ExtArgs["result"]["postTag"]>
    composites: {}
  }

  type PostTagGetPayload<S extends boolean | null | undefined | PostTagDefaultArgs> = $Result.GetResult<Prisma.$PostTagPayload, S>

  type PostTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostTagCountAggregateInputType | true
    }

  export interface PostTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostTag'], meta: { name: 'PostTag' } }
    /**
     * Find zero or one PostTag that matches the filter.
     * @param {PostTagFindUniqueArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostTagFindUniqueArgs>(args: SelectSubset<T, PostTagFindUniqueArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostTagFindUniqueOrThrowArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostTagFindUniqueOrThrowArgs>(args: SelectSubset<T, PostTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagFindFirstArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostTagFindFirstArgs>(args?: SelectSubset<T, PostTagFindFirstArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagFindFirstOrThrowArgs} args - Arguments to find a PostTag
     * @example
     * // Get one PostTag
     * const postTag = await prisma.postTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostTagFindFirstOrThrowArgs>(args?: SelectSubset<T, PostTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostTags
     * const postTags = await prisma.postTag.findMany()
     * 
     * // Get first 10 PostTags
     * const postTags = await prisma.postTag.findMany({ take: 10 })
     * 
     * // Only select the `postId`
     * const postTagWithPostIdOnly = await prisma.postTag.findMany({ select: { postId: true } })
     * 
     */
    findMany<T extends PostTagFindManyArgs>(args?: SelectSubset<T, PostTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostTag.
     * @param {PostTagCreateArgs} args - Arguments to create a PostTag.
     * @example
     * // Create one PostTag
     * const PostTag = await prisma.postTag.create({
     *   data: {
     *     // ... data to create a PostTag
     *   }
     * })
     * 
     */
    create<T extends PostTagCreateArgs>(args: SelectSubset<T, PostTagCreateArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostTags.
     * @param {PostTagCreateManyArgs} args - Arguments to create many PostTags.
     * @example
     * // Create many PostTags
     * const postTag = await prisma.postTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostTagCreateManyArgs>(args?: SelectSubset<T, PostTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PostTag.
     * @param {PostTagDeleteArgs} args - Arguments to delete one PostTag.
     * @example
     * // Delete one PostTag
     * const PostTag = await prisma.postTag.delete({
     *   where: {
     *     // ... filter to delete one PostTag
     *   }
     * })
     * 
     */
    delete<T extends PostTagDeleteArgs>(args: SelectSubset<T, PostTagDeleteArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostTag.
     * @param {PostTagUpdateArgs} args - Arguments to update one PostTag.
     * @example
     * // Update one PostTag
     * const postTag = await prisma.postTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostTagUpdateArgs>(args: SelectSubset<T, PostTagUpdateArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostTags.
     * @param {PostTagDeleteManyArgs} args - Arguments to filter PostTags to delete.
     * @example
     * // Delete a few PostTags
     * const { count } = await prisma.postTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostTagDeleteManyArgs>(args?: SelectSubset<T, PostTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostTags
     * const postTag = await prisma.postTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostTagUpdateManyArgs>(args: SelectSubset<T, PostTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostTag.
     * @param {PostTagUpsertArgs} args - Arguments to update or create a PostTag.
     * @example
     * // Update or create a PostTag
     * const postTag = await prisma.postTag.upsert({
     *   create: {
     *     // ... data to create a PostTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostTag we want to update
     *   }
     * })
     */
    upsert<T extends PostTagUpsertArgs>(args: SelectSubset<T, PostTagUpsertArgs<ExtArgs>>): Prisma__PostTagClient<$Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagCountArgs} args - Arguments to filter PostTags to count.
     * @example
     * // Count the number of PostTags
     * const count = await prisma.postTag.count({
     *   where: {
     *     // ... the filter for the PostTags we want to count
     *   }
     * })
    **/
    count<T extends PostTagCountArgs>(
      args?: Subset<T, PostTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostTagAggregateArgs>(args: Subset<T, PostTagAggregateArgs>): Prisma.PrismaPromise<GetPostTagAggregateType<T>>

    /**
     * Group by PostTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostTagGroupByArgs['orderBy'] }
        : { orderBy?: PostTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostTag model
   */
  readonly fields: PostTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostTag model
   */
  interface PostTagFieldRefs {
    readonly postId: FieldRef<"PostTag", 'String'>
    readonly tagId: FieldRef<"PostTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostTag findUnique
   */
  export type PostTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag findUniqueOrThrow
   */
  export type PostTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag findFirst
   */
  export type PostTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTags.
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * PostTag findFirstOrThrow
   */
  export type PostTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTag to fetch.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostTags.
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostTags.
     */
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * PostTag findMany
   */
  export type PostTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter, which PostTags to fetch.
     */
    where?: PostTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostTags to fetch.
     */
    orderBy?: PostTagOrderByWithRelationInput | PostTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostTags.
     */
    cursor?: PostTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostTags.
     */
    skip?: number
    distinct?: PostTagScalarFieldEnum | PostTagScalarFieldEnum[]
  }

  /**
   * PostTag create
   */
  export type PostTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * The data needed to create a PostTag.
     */
    data: XOR<PostTagCreateInput, PostTagUncheckedCreateInput>
  }

  /**
   * PostTag createMany
   */
  export type PostTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostTags.
     */
    data: PostTagCreateManyInput | PostTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostTag update
   */
  export type PostTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * The data needed to update a PostTag.
     */
    data: XOR<PostTagUpdateInput, PostTagUncheckedUpdateInput>
    /**
     * Choose, which PostTag to update.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag updateMany
   */
  export type PostTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostTags.
     */
    data: XOR<PostTagUpdateManyMutationInput, PostTagUncheckedUpdateManyInput>
    /**
     * Filter which PostTags to update
     */
    where?: PostTagWhereInput
    /**
     * Limit how many PostTags to update.
     */
    limit?: number
  }

  /**
   * PostTag upsert
   */
  export type PostTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * The filter to search for the PostTag to update in case it exists.
     */
    where: PostTagWhereUniqueInput
    /**
     * In case the PostTag found by the `where` argument doesn't exist, create a new PostTag with this data.
     */
    create: XOR<PostTagCreateInput, PostTagUncheckedCreateInput>
    /**
     * In case the PostTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostTagUpdateInput, PostTagUncheckedUpdateInput>
  }

  /**
   * PostTag delete
   */
  export type PostTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
    /**
     * Filter which PostTag to delete.
     */
    where: PostTagWhereUniqueInput
  }

  /**
   * PostTag deleteMany
   */
  export type PostTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostTags to delete
     */
    where?: PostTagWhereInput
    /**
     * Limit how many PostTags to delete.
     */
    limit?: number
  }

  /**
   * PostTag without action
   */
  export type PostTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostTag
     */
    select?: PostTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostTag
     */
    omit?: PostTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostTagInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    content: string | null
    coverImageId: string | null
    isPublished: boolean | null
    isFeatured: boolean | null
    publishDate: Date | null
    createdDate: Date | null
    updatedDate: Date | null
    isActive: boolean | null
    authorId: string | null
    codeUrl: string | null
    liveUrl: string | null
    updatedById: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    description: string | null
    content: string | null
    coverImageId: string | null
    isPublished: boolean | null
    isFeatured: boolean | null
    publishDate: Date | null
    createdDate: Date | null
    updatedDate: Date | null
    isActive: boolean | null
    authorId: string | null
    codeUrl: string | null
    liveUrl: string | null
    updatedById: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    description: number
    content: number
    coverImageId: number
    isPublished: number
    isFeatured: number
    publishDate: number
    createdDate: number
    updatedDate: number
    isActive: number
    authorId: number
    codeUrl: number
    liveUrl: number
    updatedById: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    coverImageId?: true
    isPublished?: true
    isFeatured?: true
    publishDate?: true
    createdDate?: true
    updatedDate?: true
    isActive?: true
    authorId?: true
    codeUrl?: true
    liveUrl?: true
    updatedById?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    coverImageId?: true
    isPublished?: true
    isFeatured?: true
    publishDate?: true
    createdDate?: true
    updatedDate?: true
    isActive?: true
    authorId?: true
    codeUrl?: true
    liveUrl?: true
    updatedById?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    description?: true
    content?: true
    coverImageId?: true
    isPublished?: true
    isFeatured?: true
    publishDate?: true
    createdDate?: true
    updatedDate?: true
    isActive?: true
    authorId?: true
    codeUrl?: true
    liveUrl?: true
    updatedById?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId: string | null
    isPublished: boolean
    isFeatured: boolean
    publishDate: Date | null
    createdDate: Date
    updatedDate: Date | null
    isActive: boolean
    authorId: string
    codeUrl: string | null
    liveUrl: string | null
    updatedById: string | null
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    coverImageId?: boolean
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: boolean
    createdDate?: boolean
    updatedDate?: boolean
    isActive?: boolean
    authorId?: boolean
    codeUrl?: boolean
    liveUrl?: boolean
    updatedById?: boolean
    coverImage?: boolean | Project$coverImageArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | Project$updatedByArgs<ExtArgs>
    ProjectTag?: boolean | Project$ProjectTagArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>



  export type ProjectSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean
    content?: boolean
    coverImageId?: boolean
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: boolean
    createdDate?: boolean
    updatedDate?: boolean
    isActive?: boolean
    authorId?: boolean
    codeUrl?: boolean
    liveUrl?: boolean
    updatedById?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "description" | "content" | "coverImageId" | "isPublished" | "isFeatured" | "publishDate" | "createdDate" | "updatedDate" | "isActive" | "authorId" | "codeUrl" | "liveUrl" | "updatedById", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coverImage?: boolean | Project$coverImageArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    updatedBy?: boolean | Project$updatedByArgs<ExtArgs>
    ProjectTag?: boolean | Project$ProjectTagArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      coverImage: Prisma.$FilePayload<ExtArgs> | null
      author: Prisma.$UserPayload<ExtArgs>
      updatedBy: Prisma.$UserPayload<ExtArgs> | null
      ProjectTag: Prisma.$ProjectTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      description: string
      content: string
      coverImageId: string | null
      isPublished: boolean
      isFeatured: boolean
      publishDate: Date | null
      createdDate: Date
      updatedDate: Date | null
      isActive: boolean
      authorId: string
      codeUrl: string | null
      liveUrl: string | null
      updatedById: string | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coverImage<T extends Project$coverImageArgs<ExtArgs> = {}>(args?: Subset<T, Project$coverImageArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updatedBy<T extends Project$updatedByArgs<ExtArgs> = {}>(args?: Subset<T, Project$updatedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ProjectTag<T extends Project$ProjectTagArgs<ExtArgs> = {}>(args?: Subset<T, Project$ProjectTagArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly title: FieldRef<"Project", 'String'>
    readonly slug: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly content: FieldRef<"Project", 'String'>
    readonly coverImageId: FieldRef<"Project", 'String'>
    readonly isPublished: FieldRef<"Project", 'Boolean'>
    readonly isFeatured: FieldRef<"Project", 'Boolean'>
    readonly publishDate: FieldRef<"Project", 'DateTime'>
    readonly createdDate: FieldRef<"Project", 'DateTime'>
    readonly updatedDate: FieldRef<"Project", 'DateTime'>
    readonly isActive: FieldRef<"Project", 'Boolean'>
    readonly authorId: FieldRef<"Project", 'String'>
    readonly codeUrl: FieldRef<"Project", 'String'>
    readonly liveUrl: FieldRef<"Project", 'String'>
    readonly updatedById: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.coverImage
   */
  export type Project$coverImageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
  }

  /**
   * Project.updatedBy
   */
  export type Project$updatedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Project.ProjectTag
   */
  export type Project$ProjectTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    where?: ProjectTagWhereInput
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    cursor?: ProjectTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectTag
   */

  export type AggregateProjectTag = {
    _count: ProjectTagCountAggregateOutputType | null
    _min: ProjectTagMinAggregateOutputType | null
    _max: ProjectTagMaxAggregateOutputType | null
  }

  export type ProjectTagMinAggregateOutputType = {
    projectId: string | null
    tagId: string | null
  }

  export type ProjectTagMaxAggregateOutputType = {
    projectId: string | null
    tagId: string | null
  }

  export type ProjectTagCountAggregateOutputType = {
    projectId: number
    tagId: number
    _all: number
  }


  export type ProjectTagMinAggregateInputType = {
    projectId?: true
    tagId?: true
  }

  export type ProjectTagMaxAggregateInputType = {
    projectId?: true
    tagId?: true
  }

  export type ProjectTagCountAggregateInputType = {
    projectId?: true
    tagId?: true
    _all?: true
  }

  export type ProjectTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTag to aggregate.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectTags
    **/
    _count?: true | ProjectTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectTagMaxAggregateInputType
  }

  export type GetProjectTagAggregateType<T extends ProjectTagAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectTag[P]>
      : GetScalarType<T[P], AggregateProjectTag[P]>
  }




  export type ProjectTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectTagWhereInput
    orderBy?: ProjectTagOrderByWithAggregationInput | ProjectTagOrderByWithAggregationInput[]
    by: ProjectTagScalarFieldEnum[] | ProjectTagScalarFieldEnum
    having?: ProjectTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectTagCountAggregateInputType | true
    _min?: ProjectTagMinAggregateInputType
    _max?: ProjectTagMaxAggregateInputType
  }

  export type ProjectTagGroupByOutputType = {
    projectId: string
    tagId: string
    _count: ProjectTagCountAggregateOutputType | null
    _min: ProjectTagMinAggregateOutputType | null
    _max: ProjectTagMaxAggregateOutputType | null
  }

  type GetProjectTagGroupByPayload<T extends ProjectTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectTagGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectTagGroupByOutputType[P]>
        }
      >
    >


  export type ProjectTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    projectId?: boolean
    tagId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectTag"]>



  export type ProjectTagSelectScalar = {
    projectId?: boolean
    tagId?: boolean
  }

  export type ProjectTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"projectId" | "tagId", ExtArgs["result"]["projectTag"]>
  export type ProjectTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $ProjectTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectTag"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      projectId: string
      tagId: string
    }, ExtArgs["result"]["projectTag"]>
    composites: {}
  }

  type ProjectTagGetPayload<S extends boolean | null | undefined | ProjectTagDefaultArgs> = $Result.GetResult<Prisma.$ProjectTagPayload, S>

  type ProjectTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectTagCountAggregateInputType | true
    }

  export interface ProjectTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectTag'], meta: { name: 'ProjectTag' } }
    /**
     * Find zero or one ProjectTag that matches the filter.
     * @param {ProjectTagFindUniqueArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectTagFindUniqueArgs>(args: SelectSubset<T, ProjectTagFindUniqueArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectTagFindUniqueOrThrowArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectTagFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagFindFirstArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectTagFindFirstArgs>(args?: SelectSubset<T, ProjectTagFindFirstArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagFindFirstOrThrowArgs} args - Arguments to find a ProjectTag
     * @example
     * // Get one ProjectTag
     * const projectTag = await prisma.projectTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectTagFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectTags
     * const projectTags = await prisma.projectTag.findMany()
     * 
     * // Get first 10 ProjectTags
     * const projectTags = await prisma.projectTag.findMany({ take: 10 })
     * 
     * // Only select the `projectId`
     * const projectTagWithProjectIdOnly = await prisma.projectTag.findMany({ select: { projectId: true } })
     * 
     */
    findMany<T extends ProjectTagFindManyArgs>(args?: SelectSubset<T, ProjectTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectTag.
     * @param {ProjectTagCreateArgs} args - Arguments to create a ProjectTag.
     * @example
     * // Create one ProjectTag
     * const ProjectTag = await prisma.projectTag.create({
     *   data: {
     *     // ... data to create a ProjectTag
     *   }
     * })
     * 
     */
    create<T extends ProjectTagCreateArgs>(args: SelectSubset<T, ProjectTagCreateArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectTags.
     * @param {ProjectTagCreateManyArgs} args - Arguments to create many ProjectTags.
     * @example
     * // Create many ProjectTags
     * const projectTag = await prisma.projectTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectTagCreateManyArgs>(args?: SelectSubset<T, ProjectTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProjectTag.
     * @param {ProjectTagDeleteArgs} args - Arguments to delete one ProjectTag.
     * @example
     * // Delete one ProjectTag
     * const ProjectTag = await prisma.projectTag.delete({
     *   where: {
     *     // ... filter to delete one ProjectTag
     *   }
     * })
     * 
     */
    delete<T extends ProjectTagDeleteArgs>(args: SelectSubset<T, ProjectTagDeleteArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectTag.
     * @param {ProjectTagUpdateArgs} args - Arguments to update one ProjectTag.
     * @example
     * // Update one ProjectTag
     * const projectTag = await prisma.projectTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectTagUpdateArgs>(args: SelectSubset<T, ProjectTagUpdateArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectTags.
     * @param {ProjectTagDeleteManyArgs} args - Arguments to filter ProjectTags to delete.
     * @example
     * // Delete a few ProjectTags
     * const { count } = await prisma.projectTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectTagDeleteManyArgs>(args?: SelectSubset<T, ProjectTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectTags
     * const projectTag = await prisma.projectTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectTagUpdateManyArgs>(args: SelectSubset<T, ProjectTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProjectTag.
     * @param {ProjectTagUpsertArgs} args - Arguments to update or create a ProjectTag.
     * @example
     * // Update or create a ProjectTag
     * const projectTag = await prisma.projectTag.upsert({
     *   create: {
     *     // ... data to create a ProjectTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectTag we want to update
     *   }
     * })
     */
    upsert<T extends ProjectTagUpsertArgs>(args: SelectSubset<T, ProjectTagUpsertArgs<ExtArgs>>): Prisma__ProjectTagClient<$Result.GetResult<Prisma.$ProjectTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagCountArgs} args - Arguments to filter ProjectTags to count.
     * @example
     * // Count the number of ProjectTags
     * const count = await prisma.projectTag.count({
     *   where: {
     *     // ... the filter for the ProjectTags we want to count
     *   }
     * })
    **/
    count<T extends ProjectTagCountArgs>(
      args?: Subset<T, ProjectTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectTagAggregateArgs>(args: Subset<T, ProjectTagAggregateArgs>): Prisma.PrismaPromise<GetProjectTagAggregateType<T>>

    /**
     * Group by ProjectTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectTagGroupByArgs['orderBy'] }
        : { orderBy?: ProjectTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectTag model
   */
  readonly fields: ProjectTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectTag model
   */
  interface ProjectTagFieldRefs {
    readonly projectId: FieldRef<"ProjectTag", 'String'>
    readonly tagId: FieldRef<"ProjectTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProjectTag findUnique
   */
  export type ProjectTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag findUniqueOrThrow
   */
  export type ProjectTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag findFirst
   */
  export type ProjectTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTags.
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTags.
     */
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * ProjectTag findFirstOrThrow
   */
  export type ProjectTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTag to fetch.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectTags.
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectTags.
     */
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * ProjectTag findMany
   */
  export type ProjectTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter, which ProjectTags to fetch.
     */
    where?: ProjectTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectTags to fetch.
     */
    orderBy?: ProjectTagOrderByWithRelationInput | ProjectTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectTags.
     */
    cursor?: ProjectTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectTags.
     */
    skip?: number
    distinct?: ProjectTagScalarFieldEnum | ProjectTagScalarFieldEnum[]
  }

  /**
   * ProjectTag create
   */
  export type ProjectTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectTag.
     */
    data: XOR<ProjectTagCreateInput, ProjectTagUncheckedCreateInput>
  }

  /**
   * ProjectTag createMany
   */
  export type ProjectTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectTags.
     */
    data: ProjectTagCreateManyInput | ProjectTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectTag update
   */
  export type ProjectTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectTag.
     */
    data: XOR<ProjectTagUpdateInput, ProjectTagUncheckedUpdateInput>
    /**
     * Choose, which ProjectTag to update.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag updateMany
   */
  export type ProjectTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectTags.
     */
    data: XOR<ProjectTagUpdateManyMutationInput, ProjectTagUncheckedUpdateManyInput>
    /**
     * Filter which ProjectTags to update
     */
    where?: ProjectTagWhereInput
    /**
     * Limit how many ProjectTags to update.
     */
    limit?: number
  }

  /**
   * ProjectTag upsert
   */
  export type ProjectTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectTag to update in case it exists.
     */
    where: ProjectTagWhereUniqueInput
    /**
     * In case the ProjectTag found by the `where` argument doesn't exist, create a new ProjectTag with this data.
     */
    create: XOR<ProjectTagCreateInput, ProjectTagUncheckedCreateInput>
    /**
     * In case the ProjectTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectTagUpdateInput, ProjectTagUncheckedUpdateInput>
  }

  /**
   * ProjectTag delete
   */
  export type ProjectTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
    /**
     * Filter which ProjectTag to delete.
     */
    where: ProjectTagWhereUniqueInput
  }

  /**
   * ProjectTag deleteMany
   */
  export type ProjectTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectTags to delete
     */
    where?: ProjectTagWhereInput
    /**
     * Limit how many ProjectTags to delete.
     */
    limit?: number
  }

  /**
   * ProjectTag without action
   */
  export type ProjectTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectTag
     */
    select?: ProjectTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectTag
     */
    omit?: ProjectTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FileScalarFieldEnum: {
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

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    authorId: 'authorId',
    isActive: 'isActive'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const PostScalarFieldEnum: {
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

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostTagScalarFieldEnum: {
    postId: 'postId',
    tagId: 'tagId'
  };

  export type PostTagScalarFieldEnum = (typeof PostTagScalarFieldEnum)[keyof typeof PostTagScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
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

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectTagScalarFieldEnum: {
    projectId: 'projectId',
    tagId: 'tagId'
  };

  export type ProjectTagScalarFieldEnum = (typeof ProjectTagScalarFieldEnum)[keyof typeof ProjectTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const FileOrderByRelevanceFieldEnum: {
    id: 'id',
    originalName: 'originalName',
    url: 'url',
    objectKey: 'objectKey',
    updatedById: 'updatedById',
    userId: 'userId'
  };

  export type FileOrderByRelevanceFieldEnum = (typeof FileOrderByRelevanceFieldEnum)[keyof typeof FileOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
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

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const TagOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    authorId: 'authorId'
  };

  export type TagOrderByRelevanceFieldEnum = (typeof TagOrderByRelevanceFieldEnum)[keyof typeof TagOrderByRelevanceFieldEnum]


  export const PostOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    excerpt: 'excerpt',
    content: 'content',
    coverImageId: 'coverImageId',
    authorId: 'authorId',
    updatedById: 'updatedById'
  };

  export type PostOrderByRelevanceFieldEnum = (typeof PostOrderByRelevanceFieldEnum)[keyof typeof PostOrderByRelevanceFieldEnum]


  export const PostTagOrderByRelevanceFieldEnum: {
    postId: 'postId',
    tagId: 'tagId'
  };

  export type PostTagOrderByRelevanceFieldEnum = (typeof PostTagOrderByRelevanceFieldEnum)[keyof typeof PostTagOrderByRelevanceFieldEnum]


  export const ProjectOrderByRelevanceFieldEnum: {
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

  export type ProjectOrderByRelevanceFieldEnum = (typeof ProjectOrderByRelevanceFieldEnum)[keyof typeof ProjectOrderByRelevanceFieldEnum]


  export const ProjectTagOrderByRelevanceFieldEnum: {
    projectId: 'projectId',
    tagId: 'tagId'
  };

  export type ProjectTagOrderByRelevanceFieldEnum = (typeof ProjectTagOrderByRelevanceFieldEnum)[keyof typeof ProjectTagOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'FileType'
   */
  export type EnumFileTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileType'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type FileWhereInput = {
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    id?: StringFilter<"File"> | string
    originalName?: StringFilter<"File"> | string
    size?: IntFilter<"File"> | number
    url?: StringFilter<"File"> | string
    objectKey?: StringFilter<"File"> | string
    fileType?: EnumFileTypeFilter<"File"> | $Enums.FileType
    dateUploaded?: DateTimeFilter<"File"> | Date | string
    dateUpdated?: DateTimeNullableFilter<"File"> | Date | string | null
    isActive?: BoolFilter<"File"> | boolean
    updatedById?: StringNullableFilter<"File"> | string | null
    userId?: StringFilter<"File"> | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    User?: UserListRelationFilter
    Post?: PostListRelationFilter
    Project?: ProjectListRelationFilter
  }

  export type FileOrderByWithRelationInput = {
    id?: SortOrder
    originalName?: SortOrder
    size?: SortOrder
    url?: SortOrder
    objectKey?: SortOrder
    fileType?: SortOrder
    dateUploaded?: SortOrder
    dateUpdated?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedById?: SortOrderInput | SortOrder
    userId?: SortOrder
    uploader?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    User?: UserOrderByRelationAggregateInput
    Post?: PostOrderByRelationAggregateInput
    Project?: ProjectOrderByRelationAggregateInput
    _relevance?: FileOrderByRelevanceInput
  }

  export type FileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    objectKey?: string
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    originalName?: StringFilter<"File"> | string
    size?: IntFilter<"File"> | number
    fileType?: EnumFileTypeFilter<"File"> | $Enums.FileType
    dateUploaded?: DateTimeFilter<"File"> | Date | string
    dateUpdated?: DateTimeNullableFilter<"File"> | Date | string | null
    isActive?: BoolFilter<"File"> | boolean
    updatedById?: StringNullableFilter<"File"> | string | null
    userId?: StringFilter<"File"> | string
    uploader?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    User?: UserListRelationFilter
    Post?: PostListRelationFilter
    Project?: ProjectListRelationFilter
  }, "id" | "url" | "objectKey">

  export type FileOrderByWithAggregationInput = {
    id?: SortOrder
    originalName?: SortOrder
    size?: SortOrder
    url?: SortOrder
    objectKey?: SortOrder
    fileType?: SortOrder
    dateUploaded?: SortOrder
    dateUpdated?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedById?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: FileCountOrderByAggregateInput
    _avg?: FileAvgOrderByAggregateInput
    _max?: FileMaxOrderByAggregateInput
    _min?: FileMinOrderByAggregateInput
    _sum?: FileSumOrderByAggregateInput
  }

  export type FileScalarWhereWithAggregatesInput = {
    AND?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    OR?: FileScalarWhereWithAggregatesInput[]
    NOT?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"File"> | string
    originalName?: StringWithAggregatesFilter<"File"> | string
    size?: IntWithAggregatesFilter<"File"> | number
    url?: StringWithAggregatesFilter<"File"> | string
    objectKey?: StringWithAggregatesFilter<"File"> | string
    fileType?: EnumFileTypeWithAggregatesFilter<"File"> | $Enums.FileType
    dateUploaded?: DateTimeWithAggregatesFilter<"File"> | Date | string
    dateUpdated?: DateTimeNullableWithAggregatesFilter<"File"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"File"> | boolean
    updatedById?: StringNullableWithAggregatesFilter<"File"> | string | null
    userId?: StringWithAggregatesFilter<"File"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    registeredDate?: DateTimeFilter<"User"> | Date | string
    lastLoginDate?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    bio?: StringNullableFilter<"User"> | string | null
    avatarFileId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    updatedById?: StringNullableFilter<"User"> | string | null
    dateUpdated?: DateTimeNullableFilter<"User"> | Date | string | null
    avatarFile?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    PostAuthor?: PostListRelationFilter
    ProjectAuthor?: ProjectListRelationFilter
    File?: FileListRelationFilter
    PostUpdater?: PostListRelationFilter
    ProjectUpdater?: ProjectListRelationFilter
    Tag?: TagListRelationFilter
    FileU?: FileListRelationFilter
    User?: UserListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    registeredDate?: SortOrder
    lastLoginDate?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    role?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatarFileId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedById?: SortOrderInput | SortOrder
    dateUpdated?: SortOrderInput | SortOrder
    avatarFile?: FileOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    PostAuthor?: PostOrderByRelationAggregateInput
    ProjectAuthor?: ProjectOrderByRelationAggregateInput
    File?: FileOrderByRelationAggregateInput
    PostUpdater?: PostOrderByRelationAggregateInput
    ProjectUpdater?: ProjectOrderByRelationAggregateInput
    Tag?: TagOrderByRelationAggregateInput
    FileU?: FileOrderByRelationAggregateInput
    User?: UserOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    refreshToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    registeredDate?: DateTimeFilter<"User"> | Date | string
    lastLoginDate?: DateTimeNullableFilter<"User"> | Date | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    bio?: StringNullableFilter<"User"> | string | null
    avatarFileId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    updatedById?: StringNullableFilter<"User"> | string | null
    dateUpdated?: DateTimeNullableFilter<"User"> | Date | string | null
    avatarFile?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    PostAuthor?: PostListRelationFilter
    ProjectAuthor?: ProjectListRelationFilter
    File?: FileListRelationFilter
    PostUpdater?: PostListRelationFilter
    ProjectUpdater?: ProjectListRelationFilter
    Tag?: TagListRelationFilter
    FileU?: FileListRelationFilter
    User?: UserListRelationFilter
  }, "id" | "email" | "refreshToken">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    registeredDate?: SortOrder
    lastLoginDate?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    role?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatarFileId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedById?: SortOrderInput | SortOrder
    dateUpdated?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    registeredDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginDate?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarFileId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    updatedById?: StringNullableWithAggregatesFilter<"User"> | string | null
    dateUpdated?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    authorId?: StringFilter<"Tag"> | string
    isActive?: BoolFilter<"Tag"> | boolean
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    PostTag?: PostTagListRelationFilter
    ProjectTag?: ProjectTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    isActive?: SortOrder
    author?: UserOrderByWithRelationInput
    PostTag?: PostTagOrderByRelationAggregateInput
    ProjectTag?: ProjectTagOrderByRelationAggregateInput
    _relevance?: TagOrderByRelevanceInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    authorId?: StringFilter<"Tag"> | string
    isActive?: BoolFilter<"Tag"> | boolean
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    PostTag?: PostTagListRelationFilter
    ProjectTag?: ProjectTagListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    isActive?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
    authorId?: StringWithAggregatesFilter<"Tag"> | string
    isActive?: BoolWithAggregatesFilter<"Tag"> | boolean
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    excerpt?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    isPublished?: BoolFilter<"Post"> | boolean
    isFeatured?: BoolFilter<"Post"> | boolean
    isActive?: BoolFilter<"Post"> | boolean
    publishDate?: DateTimeNullableFilter<"Post"> | Date | string | null
    createdDate?: DateTimeFilter<"Post"> | Date | string
    updatedDate?: DateTimeNullableFilter<"Post"> | Date | string | null
    coverImageId?: StringNullableFilter<"Post"> | string | null
    authorId?: StringFilter<"Post"> | string
    updatedById?: StringNullableFilter<"Post"> | string | null
    coverImage?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    PostTag?: PostTagListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    publishDate?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrderInput | SortOrder
    coverImageId?: SortOrderInput | SortOrder
    authorId?: SortOrder
    updatedById?: SortOrderInput | SortOrder
    coverImage?: FileOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    PostTag?: PostTagOrderByRelationAggregateInput
    _relevance?: PostOrderByRelevanceInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    slug?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    excerpt?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    isPublished?: BoolFilter<"Post"> | boolean
    isFeatured?: BoolFilter<"Post"> | boolean
    isActive?: BoolFilter<"Post"> | boolean
    publishDate?: DateTimeNullableFilter<"Post"> | Date | string | null
    createdDate?: DateTimeFilter<"Post"> | Date | string
    updatedDate?: DateTimeNullableFilter<"Post"> | Date | string | null
    coverImageId?: StringNullableFilter<"Post"> | string | null
    authorId?: StringFilter<"Post"> | string
    updatedById?: StringNullableFilter<"Post"> | string | null
    coverImage?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    PostTag?: PostTagListRelationFilter
  }, "id" | "title" | "slug">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    publishDate?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrderInput | SortOrder
    coverImageId?: SortOrderInput | SortOrder
    authorId?: SortOrder
    updatedById?: SortOrderInput | SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    slug?: StringWithAggregatesFilter<"Post"> | string
    excerpt?: StringWithAggregatesFilter<"Post"> | string
    content?: StringWithAggregatesFilter<"Post"> | string
    isPublished?: BoolWithAggregatesFilter<"Post"> | boolean
    isFeatured?: BoolWithAggregatesFilter<"Post"> | boolean
    isActive?: BoolWithAggregatesFilter<"Post"> | boolean
    publishDate?: DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null
    createdDate?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedDate?: DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null
    coverImageId?: StringNullableWithAggregatesFilter<"Post"> | string | null
    authorId?: StringWithAggregatesFilter<"Post"> | string
    updatedById?: StringNullableWithAggregatesFilter<"Post"> | string | null
  }

  export type PostTagWhereInput = {
    AND?: PostTagWhereInput | PostTagWhereInput[]
    OR?: PostTagWhereInput[]
    NOT?: PostTagWhereInput | PostTagWhereInput[]
    postId?: StringFilter<"PostTag"> | string
    tagId?: StringFilter<"PostTag"> | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type PostTagOrderByWithRelationInput = {
    postId?: SortOrder
    tagId?: SortOrder
    post?: PostOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
    _relevance?: PostTagOrderByRelevanceInput
  }

  export type PostTagWhereUniqueInput = Prisma.AtLeast<{
    tagId_postId?: PostTagTagIdPostIdCompoundUniqueInput
    AND?: PostTagWhereInput | PostTagWhereInput[]
    OR?: PostTagWhereInput[]
    NOT?: PostTagWhereInput | PostTagWhereInput[]
    postId?: StringFilter<"PostTag"> | string
    tagId?: StringFilter<"PostTag"> | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "tagId_postId">

  export type PostTagOrderByWithAggregationInput = {
    postId?: SortOrder
    tagId?: SortOrder
    _count?: PostTagCountOrderByAggregateInput
    _max?: PostTagMaxOrderByAggregateInput
    _min?: PostTagMinOrderByAggregateInput
  }

  export type PostTagScalarWhereWithAggregatesInput = {
    AND?: PostTagScalarWhereWithAggregatesInput | PostTagScalarWhereWithAggregatesInput[]
    OR?: PostTagScalarWhereWithAggregatesInput[]
    NOT?: PostTagScalarWhereWithAggregatesInput | PostTagScalarWhereWithAggregatesInput[]
    postId?: StringWithAggregatesFilter<"PostTag"> | string
    tagId?: StringWithAggregatesFilter<"PostTag"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    slug?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    content?: StringFilter<"Project"> | string
    coverImageId?: StringNullableFilter<"Project"> | string | null
    isPublished?: BoolFilter<"Project"> | boolean
    isFeatured?: BoolFilter<"Project"> | boolean
    publishDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdDate?: DateTimeFilter<"Project"> | Date | string
    updatedDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    isActive?: BoolFilter<"Project"> | boolean
    authorId?: StringFilter<"Project"> | string
    codeUrl?: StringNullableFilter<"Project"> | string | null
    liveUrl?: StringNullableFilter<"Project"> | string | null
    updatedById?: StringNullableFilter<"Project"> | string | null
    coverImage?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ProjectTag?: ProjectTagListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    coverImageId?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    publishDate?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    authorId?: SortOrder
    codeUrl?: SortOrderInput | SortOrder
    liveUrl?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    coverImage?: FileOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    updatedBy?: UserOrderByWithRelationInput
    ProjectTag?: ProjectTagOrderByRelationAggregateInput
    _relevance?: ProjectOrderByRelevanceInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    slug?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    description?: StringFilter<"Project"> | string
    content?: StringFilter<"Project"> | string
    coverImageId?: StringNullableFilter<"Project"> | string | null
    isPublished?: BoolFilter<"Project"> | boolean
    isFeatured?: BoolFilter<"Project"> | boolean
    publishDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdDate?: DateTimeFilter<"Project"> | Date | string
    updatedDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    isActive?: BoolFilter<"Project"> | boolean
    authorId?: StringFilter<"Project"> | string
    codeUrl?: StringNullableFilter<"Project"> | string | null
    liveUrl?: StringNullableFilter<"Project"> | string | null
    updatedById?: StringNullableFilter<"Project"> | string | null
    coverImage?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    updatedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    ProjectTag?: ProjectTagListRelationFilter
  }, "id" | "title" | "slug">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    coverImageId?: SortOrderInput | SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    publishDate?: SortOrderInput | SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    authorId?: SortOrder
    codeUrl?: SortOrderInput | SortOrder
    liveUrl?: SortOrderInput | SortOrder
    updatedById?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    title?: StringWithAggregatesFilter<"Project"> | string
    slug?: StringWithAggregatesFilter<"Project"> | string
    description?: StringWithAggregatesFilter<"Project"> | string
    content?: StringWithAggregatesFilter<"Project"> | string
    coverImageId?: StringNullableWithAggregatesFilter<"Project"> | string | null
    isPublished?: BoolWithAggregatesFilter<"Project"> | boolean
    isFeatured?: BoolWithAggregatesFilter<"Project"> | boolean
    publishDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    createdDate?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedDate?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"Project"> | boolean
    authorId?: StringWithAggregatesFilter<"Project"> | string
    codeUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    liveUrl?: StringNullableWithAggregatesFilter<"Project"> | string | null
    updatedById?: StringNullableWithAggregatesFilter<"Project"> | string | null
  }

  export type ProjectTagWhereInput = {
    AND?: ProjectTagWhereInput | ProjectTagWhereInput[]
    OR?: ProjectTagWhereInput[]
    NOT?: ProjectTagWhereInput | ProjectTagWhereInput[]
    projectId?: StringFilter<"ProjectTag"> | string
    tagId?: StringFilter<"ProjectTag"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type ProjectTagOrderByWithRelationInput = {
    projectId?: SortOrder
    tagId?: SortOrder
    project?: ProjectOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
    _relevance?: ProjectTagOrderByRelevanceInput
  }

  export type ProjectTagWhereUniqueInput = Prisma.AtLeast<{
    projectId_tagId?: ProjectTagProjectIdTagIdCompoundUniqueInput
    AND?: ProjectTagWhereInput | ProjectTagWhereInput[]
    OR?: ProjectTagWhereInput[]
    NOT?: ProjectTagWhereInput | ProjectTagWhereInput[]
    projectId?: StringFilter<"ProjectTag"> | string
    tagId?: StringFilter<"ProjectTag"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "projectId_tagId">

  export type ProjectTagOrderByWithAggregationInput = {
    projectId?: SortOrder
    tagId?: SortOrder
    _count?: ProjectTagCountOrderByAggregateInput
    _max?: ProjectTagMaxOrderByAggregateInput
    _min?: ProjectTagMinOrderByAggregateInput
  }

  export type ProjectTagScalarWhereWithAggregatesInput = {
    AND?: ProjectTagScalarWhereWithAggregatesInput | ProjectTagScalarWhereWithAggregatesInput[]
    OR?: ProjectTagScalarWhereWithAggregatesInput[]
    NOT?: ProjectTagScalarWhereWithAggregatesInput | ProjectTagScalarWhereWithAggregatesInput[]
    projectId?: StringWithAggregatesFilter<"ProjectTag"> | string
    tagId?: StringWithAggregatesFilter<"ProjectTag"> | string
  }

  export type FileCreateInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    uploader: UserCreateNestedOneWithoutFileInput
    updatedBy?: UserCreateNestedOneWithoutFileUInput
    User?: UserCreateNestedManyWithoutAvatarFileInput
    Post?: PostCreateNestedManyWithoutCoverImageInput
    Project?: ProjectCreateNestedManyWithoutCoverImageInput
  }

  export type FileUncheckedCreateInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
    userId: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarFileInput
    Post?: PostUncheckedCreateNestedManyWithoutCoverImageInput
    Project?: ProjectUncheckedCreateNestedManyWithoutCoverImageInput
  }

  export type FileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploader?: UserUpdateOneRequiredWithoutFileNestedInput
    updatedBy?: UserUpdateOneWithoutFileUNestedInput
    User?: UserUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUncheckedUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutCoverImageNestedInput
  }

  export type FileCreateManyInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
    userId: string
  }

  export type FileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TagCreateInput = {
    id?: string
    name: string
    isActive?: boolean
    author: UserCreateNestedOneWithoutTagInput
    PostTag?: PostTagCreateNestedManyWithoutTagInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    authorId: string
    isActive?: boolean
    PostTag?: PostTagUncheckedCreateNestedManyWithoutTagInput
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutTagNestedInput
    PostTag?: PostTagUpdateManyWithoutTagNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    PostTag?: PostTagUncheckedUpdateManyWithoutTagNestedInput
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
    authorId: string
    isActive?: boolean
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PostCreateInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImage?: FileCreateNestedOneWithoutPostInput
    author: UserCreateNestedOneWithoutPostAuthorInput
    updatedBy?: UserCreateNestedOneWithoutPostUpdaterInput
    PostTag?: PostTagCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    authorId: string
    updatedById?: string | null
    PostTag?: PostTagUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImage?: FileUpdateOneWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostAuthorNestedInput
    updatedBy?: UserUpdateOneWithoutPostUpdaterNestedInput
    PostTag?: PostTagUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    PostTag?: PostTagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    authorId: string
    updatedById?: string | null
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostTagCreateInput = {
    post: PostCreateNestedOneWithoutPostTagInput
    tag: TagCreateNestedOneWithoutPostTagInput
  }

  export type PostTagUncheckedCreateInput = {
    postId: string
    tagId: string
  }

  export type PostTagUpdateInput = {
    post?: PostUpdateOneRequiredWithoutPostTagNestedInput
    tag?: TagUpdateOneRequiredWithoutPostTagNestedInput
  }

  export type PostTagUncheckedUpdateInput = {
    postId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type PostTagCreateManyInput = {
    postId: string
    tagId: string
  }

  export type PostTagUpdateManyMutationInput = {

  }

  export type PostTagUncheckedUpdateManyInput = {
    postId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    coverImage?: FileCreateNestedOneWithoutProjectInput
    author: UserCreateNestedOneWithoutProjectAuthorInput
    updatedBy?: UserCreateNestedOneWithoutProjectUpdaterInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: FileUpdateOneWithoutProjectNestedInput
    author?: UserUpdateOneRequiredWithoutProjectAuthorNestedInput
    updatedBy?: UserUpdateOneWithoutProjectUpdaterNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectTagCreateInput = {
    project: ProjectCreateNestedOneWithoutProjectTagInput
    tag: TagCreateNestedOneWithoutProjectTagInput
  }

  export type ProjectTagUncheckedCreateInput = {
    projectId: string
    tagId: string
  }

  export type ProjectTagUpdateInput = {
    project?: ProjectUpdateOneRequiredWithoutProjectTagNestedInput
    tag?: TagUpdateOneRequiredWithoutProjectTagNestedInput
  }

  export type ProjectTagUncheckedUpdateInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagCreateManyInput = {
    projectId: string
    tagId: string
  }

  export type ProjectTagUpdateManyMutationInput = {

  }

  export type ProjectTagUncheckedUpdateManyInput = {
    projectId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumFileTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[]
    notIn?: $Enums.FileType[]
    not?: NestedEnumFileTypeFilter<$PrismaModel> | $Enums.FileType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileOrderByRelevanceInput = {
    fields: FileOrderByRelevanceFieldEnum | FileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type FileCountOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    size?: SortOrder
    url?: SortOrder
    objectKey?: SortOrder
    fileType?: SortOrder
    dateUploaded?: SortOrder
    dateUpdated?: SortOrder
    isActive?: SortOrder
    updatedById?: SortOrder
    userId?: SortOrder
  }

  export type FileAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type FileMaxOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    size?: SortOrder
    url?: SortOrder
    objectKey?: SortOrder
    fileType?: SortOrder
    dateUploaded?: SortOrder
    dateUpdated?: SortOrder
    isActive?: SortOrder
    updatedById?: SortOrder
    userId?: SortOrder
  }

  export type FileMinOrderByAggregateInput = {
    id?: SortOrder
    originalName?: SortOrder
    size?: SortOrder
    url?: SortOrder
    objectKey?: SortOrder
    fileType?: SortOrder
    dateUploaded?: SortOrder
    dateUpdated?: SortOrder
    isActive?: SortOrder
    updatedById?: SortOrder
    userId?: SortOrder
  }

  export type FileSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumFileTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[]
    notIn?: $Enums.FileType[]
    not?: NestedEnumFileTypeWithAggregatesFilter<$PrismaModel> | $Enums.FileType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileTypeFilter<$PrismaModel>
    _max?: NestedEnumFileTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type FileNullableScalarRelationFilter = {
    is?: FileWhereInput | null
    isNot?: FileWhereInput | null
  }

  export type FileListRelationFilter = {
    every?: FileWhereInput
    some?: FileWhereInput
    none?: FileWhereInput
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type FileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    registeredDate?: SortOrder
    lastLoginDate?: SortOrder
    refreshToken?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    avatarFileId?: SortOrder
    isActive?: SortOrder
    updatedById?: SortOrder
    dateUpdated?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    registeredDate?: SortOrder
    lastLoginDate?: SortOrder
    refreshToken?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    avatarFileId?: SortOrder
    isActive?: SortOrder
    updatedById?: SortOrder
    dateUpdated?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    registeredDate?: SortOrder
    lastLoginDate?: SortOrder
    refreshToken?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    avatarFileId?: SortOrder
    isActive?: SortOrder
    updatedById?: SortOrder
    dateUpdated?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type PostTagListRelationFilter = {
    every?: PostTagWhereInput
    some?: PostTagWhereInput
    none?: PostTagWhereInput
  }

  export type ProjectTagListRelationFilter = {
    every?: ProjectTagWhereInput
    some?: ProjectTagWhereInput
    none?: ProjectTagWhereInput
  }

  export type PostTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagOrderByRelevanceInput = {
    fields: TagOrderByRelevanceFieldEnum | TagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    isActive?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    isActive?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    authorId?: SortOrder
    isActive?: SortOrder
  }

  export type PostOrderByRelevanceInput = {
    fields: PostOrderByRelevanceFieldEnum | PostOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    publishDate?: SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrder
    coverImageId?: SortOrder
    authorId?: SortOrder
    updatedById?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    publishDate?: SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrder
    coverImageId?: SortOrder
    authorId?: SortOrder
    updatedById?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    excerpt?: SortOrder
    content?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    isActive?: SortOrder
    publishDate?: SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrder
    coverImageId?: SortOrder
    authorId?: SortOrder
    updatedById?: SortOrder
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type PostTagOrderByRelevanceInput = {
    fields: PostTagOrderByRelevanceFieldEnum | PostTagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostTagTagIdPostIdCompoundUniqueInput = {
    tagId: string
    postId: string
  }

  export type PostTagCountOrderByAggregateInput = {
    postId?: SortOrder
    tagId?: SortOrder
  }

  export type PostTagMaxOrderByAggregateInput = {
    postId?: SortOrder
    tagId?: SortOrder
  }

  export type PostTagMinOrderByAggregateInput = {
    postId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectOrderByRelevanceInput = {
    fields: ProjectOrderByRelevanceFieldEnum | ProjectOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    coverImageId?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    publishDate?: SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrder
    isActive?: SortOrder
    authorId?: SortOrder
    codeUrl?: SortOrder
    liveUrl?: SortOrder
    updatedById?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    coverImageId?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    publishDate?: SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrder
    isActive?: SortOrder
    authorId?: SortOrder
    codeUrl?: SortOrder
    liveUrl?: SortOrder
    updatedById?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    content?: SortOrder
    coverImageId?: SortOrder
    isPublished?: SortOrder
    isFeatured?: SortOrder
    publishDate?: SortOrder
    createdDate?: SortOrder
    updatedDate?: SortOrder
    isActive?: SortOrder
    authorId?: SortOrder
    codeUrl?: SortOrder
    liveUrl?: SortOrder
    updatedById?: SortOrder
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ProjectTagOrderByRelevanceInput = {
    fields: ProjectTagOrderByRelevanceFieldEnum | ProjectTagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProjectTagProjectIdTagIdCompoundUniqueInput = {
    projectId: string
    tagId: string
  }

  export type ProjectTagCountOrderByAggregateInput = {
    projectId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectTagMaxOrderByAggregateInput = {
    projectId?: SortOrder
    tagId?: SortOrder
  }

  export type ProjectTagMinOrderByAggregateInput = {
    projectId?: SortOrder
    tagId?: SortOrder
  }

  export type UserCreateNestedOneWithoutFileInput = {
    create?: XOR<UserCreateWithoutFileInput, UserUncheckedCreateWithoutFileInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFileUInput = {
    create?: XOR<UserCreateWithoutFileUInput, UserUncheckedCreateWithoutFileUInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileUInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutAvatarFileInput = {
    create?: XOR<UserCreateWithoutAvatarFileInput, UserUncheckedCreateWithoutAvatarFileInput> | UserCreateWithoutAvatarFileInput[] | UserUncheckedCreateWithoutAvatarFileInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarFileInput | UserCreateOrConnectWithoutAvatarFileInput[]
    createMany?: UserCreateManyAvatarFileInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutCoverImageInput = {
    create?: XOR<PostCreateWithoutCoverImageInput, PostUncheckedCreateWithoutCoverImageInput> | PostCreateWithoutCoverImageInput[] | PostUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCoverImageInput | PostCreateOrConnectWithoutCoverImageInput[]
    createMany?: PostCreateManyCoverImageInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutCoverImageInput = {
    create?: XOR<ProjectCreateWithoutCoverImageInput, ProjectUncheckedCreateWithoutCoverImageInput> | ProjectCreateWithoutCoverImageInput[] | ProjectUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoverImageInput | ProjectCreateOrConnectWithoutCoverImageInput[]
    createMany?: ProjectCreateManyCoverImageInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAvatarFileInput = {
    create?: XOR<UserCreateWithoutAvatarFileInput, UserUncheckedCreateWithoutAvatarFileInput> | UserCreateWithoutAvatarFileInput[] | UserUncheckedCreateWithoutAvatarFileInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarFileInput | UserCreateOrConnectWithoutAvatarFileInput[]
    createMany?: UserCreateManyAvatarFileInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutCoverImageInput = {
    create?: XOR<PostCreateWithoutCoverImageInput, PostUncheckedCreateWithoutCoverImageInput> | PostCreateWithoutCoverImageInput[] | PostUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCoverImageInput | PostCreateOrConnectWithoutCoverImageInput[]
    createMany?: PostCreateManyCoverImageInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutCoverImageInput = {
    create?: XOR<ProjectCreateWithoutCoverImageInput, ProjectUncheckedCreateWithoutCoverImageInput> | ProjectCreateWithoutCoverImageInput[] | ProjectUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoverImageInput | ProjectCreateOrConnectWithoutCoverImageInput[]
    createMany?: ProjectCreateManyCoverImageInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumFileTypeFieldUpdateOperationsInput = {
    set?: $Enums.FileType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutFileNestedInput = {
    create?: XOR<UserCreateWithoutFileInput, UserUncheckedCreateWithoutFileInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileInput
    upsert?: UserUpsertWithoutFileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFileInput, UserUpdateWithoutFileInput>, UserUncheckedUpdateWithoutFileInput>
  }

  export type UserUpdateOneWithoutFileUNestedInput = {
    create?: XOR<UserCreateWithoutFileUInput, UserUncheckedCreateWithoutFileUInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileUInput
    upsert?: UserUpsertWithoutFileUInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFileUInput, UserUpdateWithoutFileUInput>, UserUncheckedUpdateWithoutFileUInput>
  }

  export type UserUpdateManyWithoutAvatarFileNestedInput = {
    create?: XOR<UserCreateWithoutAvatarFileInput, UserUncheckedCreateWithoutAvatarFileInput> | UserCreateWithoutAvatarFileInput[] | UserUncheckedCreateWithoutAvatarFileInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarFileInput | UserCreateOrConnectWithoutAvatarFileInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAvatarFileInput | UserUpsertWithWhereUniqueWithoutAvatarFileInput[]
    createMany?: UserCreateManyAvatarFileInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAvatarFileInput | UserUpdateWithWhereUniqueWithoutAvatarFileInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAvatarFileInput | UserUpdateManyWithWhereWithoutAvatarFileInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PostUpdateManyWithoutCoverImageNestedInput = {
    create?: XOR<PostCreateWithoutCoverImageInput, PostUncheckedCreateWithoutCoverImageInput> | PostCreateWithoutCoverImageInput[] | PostUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCoverImageInput | PostCreateOrConnectWithoutCoverImageInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCoverImageInput | PostUpsertWithWhereUniqueWithoutCoverImageInput[]
    createMany?: PostCreateManyCoverImageInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCoverImageInput | PostUpdateWithWhereUniqueWithoutCoverImageInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCoverImageInput | PostUpdateManyWithWhereWithoutCoverImageInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutCoverImageNestedInput = {
    create?: XOR<ProjectCreateWithoutCoverImageInput, ProjectUncheckedCreateWithoutCoverImageInput> | ProjectCreateWithoutCoverImageInput[] | ProjectUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoverImageInput | ProjectCreateOrConnectWithoutCoverImageInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCoverImageInput | ProjectUpsertWithWhereUniqueWithoutCoverImageInput[]
    createMany?: ProjectCreateManyCoverImageInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCoverImageInput | ProjectUpdateWithWhereUniqueWithoutCoverImageInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCoverImageInput | ProjectUpdateManyWithWhereWithoutCoverImageInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUncheckedUpdateManyWithoutAvatarFileNestedInput = {
    create?: XOR<UserCreateWithoutAvatarFileInput, UserUncheckedCreateWithoutAvatarFileInput> | UserCreateWithoutAvatarFileInput[] | UserUncheckedCreateWithoutAvatarFileInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarFileInput | UserCreateOrConnectWithoutAvatarFileInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAvatarFileInput | UserUpsertWithWhereUniqueWithoutAvatarFileInput[]
    createMany?: UserCreateManyAvatarFileInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAvatarFileInput | UserUpdateWithWhereUniqueWithoutAvatarFileInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAvatarFileInput | UserUpdateManyWithWhereWithoutAvatarFileInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutCoverImageNestedInput = {
    create?: XOR<PostCreateWithoutCoverImageInput, PostUncheckedCreateWithoutCoverImageInput> | PostCreateWithoutCoverImageInput[] | PostUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCoverImageInput | PostCreateOrConnectWithoutCoverImageInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCoverImageInput | PostUpsertWithWhereUniqueWithoutCoverImageInput[]
    createMany?: PostCreateManyCoverImageInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCoverImageInput | PostUpdateWithWhereUniqueWithoutCoverImageInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCoverImageInput | PostUpdateManyWithWhereWithoutCoverImageInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutCoverImageNestedInput = {
    create?: XOR<ProjectCreateWithoutCoverImageInput, ProjectUncheckedCreateWithoutCoverImageInput> | ProjectCreateWithoutCoverImageInput[] | ProjectUncheckedCreateWithoutCoverImageInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutCoverImageInput | ProjectCreateOrConnectWithoutCoverImageInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutCoverImageInput | ProjectUpsertWithWhereUniqueWithoutCoverImageInput[]
    createMany?: ProjectCreateManyCoverImageInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutCoverImageInput | ProjectUpdateWithWhereUniqueWithoutCoverImageInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutCoverImageInput | ProjectUpdateManyWithWhereWithoutCoverImageInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type FileCreateNestedOneWithoutUserInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
    connectOrCreate?: FileCreateOrConnectWithoutUserInput
    connect?: FileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUserInput = {
    create?: XOR<UserCreateWithoutUserInput, UserUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutUploaderInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<PostCreateWithoutUpdatedByInput, PostUncheckedCreateWithoutUpdatedByInput> | PostCreateWithoutUpdatedByInput[] | PostUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUpdatedByInput | PostCreateOrConnectWithoutUpdatedByInput[]
    createMany?: PostCreateManyUpdatedByInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<ProjectCreateWithoutUpdatedByInput, ProjectUncheckedCreateWithoutUpdatedByInput> | ProjectCreateWithoutUpdatedByInput[] | ProjectUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUpdatedByInput | ProjectCreateOrConnectWithoutUpdatedByInput[]
    createMany?: ProjectCreateManyUpdatedByInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TagCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TagCreateWithoutAuthorInput, TagUncheckedCreateWithoutAuthorInput> | TagCreateWithoutAuthorInput[] | TagUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAuthorInput | TagCreateOrConnectWithoutAuthorInput[]
    createMany?: TagCreateManyAuthorInputEnvelope
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<FileCreateWithoutUpdatedByInput, FileUncheckedCreateWithoutUpdatedByInput> | FileCreateWithoutUpdatedByInput[] | FileUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUpdatedByInput | FileCreateOrConnectWithoutUpdatedByInput[]
    createMany?: FileCreateManyUpdatedByInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<UserCreateWithoutUpdatedByInput, UserUncheckedCreateWithoutUpdatedByInput> | UserCreateWithoutUpdatedByInput[] | UserUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedByInput | UserCreateOrConnectWithoutUpdatedByInput[]
    createMany?: UserCreateManyUpdatedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutUploaderInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<PostCreateWithoutUpdatedByInput, PostUncheckedCreateWithoutUpdatedByInput> | PostCreateWithoutUpdatedByInput[] | PostUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUpdatedByInput | PostCreateOrConnectWithoutUpdatedByInput[]
    createMany?: PostCreateManyUpdatedByInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<ProjectCreateWithoutUpdatedByInput, ProjectUncheckedCreateWithoutUpdatedByInput> | ProjectCreateWithoutUpdatedByInput[] | ProjectUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUpdatedByInput | ProjectCreateOrConnectWithoutUpdatedByInput[]
    createMany?: ProjectCreateManyUpdatedByInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TagUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TagCreateWithoutAuthorInput, TagUncheckedCreateWithoutAuthorInput> | TagCreateWithoutAuthorInput[] | TagUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAuthorInput | TagCreateOrConnectWithoutAuthorInput[]
    createMany?: TagCreateManyAuthorInputEnvelope
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<FileCreateWithoutUpdatedByInput, FileUncheckedCreateWithoutUpdatedByInput> | FileCreateWithoutUpdatedByInput[] | FileUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUpdatedByInput | FileCreateOrConnectWithoutUpdatedByInput[]
    createMany?: FileCreateManyUpdatedByInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: XOR<UserCreateWithoutUpdatedByInput, UserUncheckedCreateWithoutUpdatedByInput> | UserCreateWithoutUpdatedByInput[] | UserUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedByInput | UserCreateOrConnectWithoutUpdatedByInput[]
    createMany?: UserCreateManyUpdatedByInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type FileUpdateOneWithoutUserNestedInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
    connectOrCreate?: FileCreateOrConnectWithoutUserInput
    upsert?: FileUpsertWithoutUserInput
    disconnect?: FileWhereInput | boolean
    delete?: FileWhereInput | boolean
    connect?: FileWhereUniqueInput
    update?: XOR<XOR<FileUpdateToOneWithWhereWithoutUserInput, FileUpdateWithoutUserInput>, FileUncheckedUpdateWithoutUserInput>
  }

  export type UserUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserCreateWithoutUserInput, UserUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserInput
    upsert?: UserUpsertWithoutUserInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserInput, UserUpdateWithoutUserInput>, UserUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAuthorInput | ProjectUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAuthorInput | ProjectUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAuthorInput | ProjectUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type FileUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUploaderInput | FileUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUploaderInput | FileUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUploaderInput | FileUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type PostUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<PostCreateWithoutUpdatedByInput, PostUncheckedCreateWithoutUpdatedByInput> | PostCreateWithoutUpdatedByInput[] | PostUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUpdatedByInput | PostCreateOrConnectWithoutUpdatedByInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUpdatedByInput | PostUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: PostCreateManyUpdatedByInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUpdatedByInput | PostUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUpdatedByInput | PostUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<ProjectCreateWithoutUpdatedByInput, ProjectUncheckedCreateWithoutUpdatedByInput> | ProjectCreateWithoutUpdatedByInput[] | ProjectUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUpdatedByInput | ProjectCreateOrConnectWithoutUpdatedByInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUpdatedByInput | ProjectUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: ProjectCreateManyUpdatedByInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUpdatedByInput | ProjectUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUpdatedByInput | ProjectUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TagUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TagCreateWithoutAuthorInput, TagUncheckedCreateWithoutAuthorInput> | TagCreateWithoutAuthorInput[] | TagUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAuthorInput | TagCreateOrConnectWithoutAuthorInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutAuthorInput | TagUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TagCreateManyAuthorInputEnvelope
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutAuthorInput | TagUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TagUpdateManyWithWhereWithoutAuthorInput | TagUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type FileUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<FileCreateWithoutUpdatedByInput, FileUncheckedCreateWithoutUpdatedByInput> | FileCreateWithoutUpdatedByInput[] | FileUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUpdatedByInput | FileCreateOrConnectWithoutUpdatedByInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUpdatedByInput | FileUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: FileCreateManyUpdatedByInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUpdatedByInput | FileUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUpdatedByInput | FileUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type UserUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedByInput, UserUncheckedCreateWithoutUpdatedByInput> | UserCreateWithoutUpdatedByInput[] | UserUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedByInput | UserCreateOrConnectWithoutUpdatedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutUpdatedByInput | UserUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: UserCreateManyUpdatedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutUpdatedByInput | UserUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutUpdatedByInput | UserUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAuthorInput | ProjectUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAuthorInput | ProjectUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAuthorInput | ProjectUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutUploaderNestedInput = {
    create?: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput> | FileCreateWithoutUploaderInput[] | FileUncheckedCreateWithoutUploaderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUploaderInput | FileCreateOrConnectWithoutUploaderInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUploaderInput | FileUpsertWithWhereUniqueWithoutUploaderInput[]
    createMany?: FileCreateManyUploaderInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUploaderInput | FileUpdateWithWhereUniqueWithoutUploaderInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUploaderInput | FileUpdateManyWithWhereWithoutUploaderInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<PostCreateWithoutUpdatedByInput, PostUncheckedCreateWithoutUpdatedByInput> | PostCreateWithoutUpdatedByInput[] | PostUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUpdatedByInput | PostCreateOrConnectWithoutUpdatedByInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUpdatedByInput | PostUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: PostCreateManyUpdatedByInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUpdatedByInput | PostUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUpdatedByInput | PostUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<ProjectCreateWithoutUpdatedByInput, ProjectUncheckedCreateWithoutUpdatedByInput> | ProjectCreateWithoutUpdatedByInput[] | ProjectUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUpdatedByInput | ProjectCreateOrConnectWithoutUpdatedByInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUpdatedByInput | ProjectUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: ProjectCreateManyUpdatedByInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUpdatedByInput | ProjectUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUpdatedByInput | ProjectUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TagUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TagCreateWithoutAuthorInput, TagUncheckedCreateWithoutAuthorInput> | TagCreateWithoutAuthorInput[] | TagUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TagCreateOrConnectWithoutAuthorInput | TagCreateOrConnectWithoutAuthorInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutAuthorInput | TagUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TagCreateManyAuthorInputEnvelope
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutAuthorInput | TagUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TagUpdateManyWithWhereWithoutAuthorInput | TagUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<FileCreateWithoutUpdatedByInput, FileUncheckedCreateWithoutUpdatedByInput> | FileCreateWithoutUpdatedByInput[] | FileUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUpdatedByInput | FileCreateOrConnectWithoutUpdatedByInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUpdatedByInput | FileUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: FileCreateManyUpdatedByInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUpdatedByInput | FileUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUpdatedByInput | FileUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: XOR<UserCreateWithoutUpdatedByInput, UserUncheckedCreateWithoutUpdatedByInput> | UserCreateWithoutUpdatedByInput[] | UserUncheckedCreateWithoutUpdatedByInput[]
    connectOrCreate?: UserCreateOrConnectWithoutUpdatedByInput | UserCreateOrConnectWithoutUpdatedByInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutUpdatedByInput | UserUpsertWithWhereUniqueWithoutUpdatedByInput[]
    createMany?: UserCreateManyUpdatedByInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutUpdatedByInput | UserUpdateWithWhereUniqueWithoutUpdatedByInput[]
    updateMany?: UserUpdateManyWithWhereWithoutUpdatedByInput | UserUpdateManyWithWhereWithoutUpdatedByInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTagInput = {
    create?: XOR<UserCreateWithoutTagInput, UserUncheckedCreateWithoutTagInput>
    connectOrCreate?: UserCreateOrConnectWithoutTagInput
    connect?: UserWhereUniqueInput
  }

  export type PostTagCreateNestedManyWithoutTagInput = {
    create?: XOR<PostTagCreateWithoutTagInput, PostTagUncheckedCreateWithoutTagInput> | PostTagCreateWithoutTagInput[] | PostTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutTagInput | PostTagCreateOrConnectWithoutTagInput[]
    createMany?: PostTagCreateManyTagInputEnvelope
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
  }

  export type ProjectTagCreateNestedManyWithoutTagInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type PostTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<PostTagCreateWithoutTagInput, PostTagUncheckedCreateWithoutTagInput> | PostTagCreateWithoutTagInput[] | PostTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutTagInput | PostTagCreateOrConnectWithoutTagInput[]
    createMany?: PostTagCreateManyTagInputEnvelope
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
  }

  export type ProjectTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTagNestedInput = {
    create?: XOR<UserCreateWithoutTagInput, UserUncheckedCreateWithoutTagInput>
    connectOrCreate?: UserCreateOrConnectWithoutTagInput
    upsert?: UserUpsertWithoutTagInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTagInput, UserUpdateWithoutTagInput>, UserUncheckedUpdateWithoutTagInput>
  }

  export type PostTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<PostTagCreateWithoutTagInput, PostTagUncheckedCreateWithoutTagInput> | PostTagCreateWithoutTagInput[] | PostTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutTagInput | PostTagCreateOrConnectWithoutTagInput[]
    upsert?: PostTagUpsertWithWhereUniqueWithoutTagInput | PostTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PostTagCreateManyTagInputEnvelope
    set?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    disconnect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    delete?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    update?: PostTagUpdateWithWhereUniqueWithoutTagInput | PostTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PostTagUpdateManyWithWhereWithoutTagInput | PostTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PostTagScalarWhereInput | PostTagScalarWhereInput[]
  }

  export type ProjectTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutTagInput | ProjectTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutTagInput | ProjectTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutTagInput | ProjectTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type PostTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<PostTagCreateWithoutTagInput, PostTagUncheckedCreateWithoutTagInput> | PostTagCreateWithoutTagInput[] | PostTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutTagInput | PostTagCreateOrConnectWithoutTagInput[]
    upsert?: PostTagUpsertWithWhereUniqueWithoutTagInput | PostTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: PostTagCreateManyTagInputEnvelope
    set?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    disconnect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    delete?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    update?: PostTagUpdateWithWhereUniqueWithoutTagInput | PostTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: PostTagUpdateManyWithWhereWithoutTagInput | PostTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: PostTagScalarWhereInput | PostTagScalarWhereInput[]
  }

  export type ProjectTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput> | ProjectTagCreateWithoutTagInput[] | ProjectTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutTagInput | ProjectTagCreateOrConnectWithoutTagInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutTagInput | ProjectTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: ProjectTagCreateManyTagInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutTagInput | ProjectTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutTagInput | ProjectTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type FileCreateNestedOneWithoutPostInput = {
    create?: XOR<FileCreateWithoutPostInput, FileUncheckedCreateWithoutPostInput>
    connectOrCreate?: FileCreateOrConnectWithoutPostInput
    connect?: FileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPostAuthorInput = {
    create?: XOR<UserCreateWithoutPostAuthorInput, UserUncheckedCreateWithoutPostAuthorInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostAuthorInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPostUpdaterInput = {
    create?: XOR<UserCreateWithoutPostUpdaterInput, UserUncheckedCreateWithoutPostUpdaterInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostUpdaterInput
    connect?: UserWhereUniqueInput
  }

  export type PostTagCreateNestedManyWithoutPostInput = {
    create?: XOR<PostTagCreateWithoutPostInput, PostTagUncheckedCreateWithoutPostInput> | PostTagCreateWithoutPostInput[] | PostTagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutPostInput | PostTagCreateOrConnectWithoutPostInput[]
    createMany?: PostTagCreateManyPostInputEnvelope
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
  }

  export type PostTagUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostTagCreateWithoutPostInput, PostTagUncheckedCreateWithoutPostInput> | PostTagCreateWithoutPostInput[] | PostTagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutPostInput | PostTagCreateOrConnectWithoutPostInput[]
    createMany?: PostTagCreateManyPostInputEnvelope
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
  }

  export type FileUpdateOneWithoutPostNestedInput = {
    create?: XOR<FileCreateWithoutPostInput, FileUncheckedCreateWithoutPostInput>
    connectOrCreate?: FileCreateOrConnectWithoutPostInput
    upsert?: FileUpsertWithoutPostInput
    disconnect?: FileWhereInput | boolean
    delete?: FileWhereInput | boolean
    connect?: FileWhereUniqueInput
    update?: XOR<XOR<FileUpdateToOneWithWhereWithoutPostInput, FileUpdateWithoutPostInput>, FileUncheckedUpdateWithoutPostInput>
  }

  export type UserUpdateOneRequiredWithoutPostAuthorNestedInput = {
    create?: XOR<UserCreateWithoutPostAuthorInput, UserUncheckedCreateWithoutPostAuthorInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostAuthorInput
    upsert?: UserUpsertWithoutPostAuthorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostAuthorInput, UserUpdateWithoutPostAuthorInput>, UserUncheckedUpdateWithoutPostAuthorInput>
  }

  export type UserUpdateOneWithoutPostUpdaterNestedInput = {
    create?: XOR<UserCreateWithoutPostUpdaterInput, UserUncheckedCreateWithoutPostUpdaterInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostUpdaterInput
    upsert?: UserUpsertWithoutPostUpdaterInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostUpdaterInput, UserUpdateWithoutPostUpdaterInput>, UserUncheckedUpdateWithoutPostUpdaterInput>
  }

  export type PostTagUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostTagCreateWithoutPostInput, PostTagUncheckedCreateWithoutPostInput> | PostTagCreateWithoutPostInput[] | PostTagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutPostInput | PostTagCreateOrConnectWithoutPostInput[]
    upsert?: PostTagUpsertWithWhereUniqueWithoutPostInput | PostTagUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostTagCreateManyPostInputEnvelope
    set?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    disconnect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    delete?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    update?: PostTagUpdateWithWhereUniqueWithoutPostInput | PostTagUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostTagUpdateManyWithWhereWithoutPostInput | PostTagUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostTagScalarWhereInput | PostTagScalarWhereInput[]
  }

  export type PostTagUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostTagCreateWithoutPostInput, PostTagUncheckedCreateWithoutPostInput> | PostTagCreateWithoutPostInput[] | PostTagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostTagCreateOrConnectWithoutPostInput | PostTagCreateOrConnectWithoutPostInput[]
    upsert?: PostTagUpsertWithWhereUniqueWithoutPostInput | PostTagUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostTagCreateManyPostInputEnvelope
    set?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    disconnect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    delete?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    connect?: PostTagWhereUniqueInput | PostTagWhereUniqueInput[]
    update?: PostTagUpdateWithWhereUniqueWithoutPostInput | PostTagUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostTagUpdateManyWithWhereWithoutPostInput | PostTagUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostTagScalarWhereInput | PostTagScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutPostTagInput = {
    create?: XOR<PostCreateWithoutPostTagInput, PostUncheckedCreateWithoutPostTagInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostTagInput
    connect?: PostWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutPostTagInput = {
    create?: XOR<TagCreateWithoutPostTagInput, TagUncheckedCreateWithoutPostTagInput>
    connectOrCreate?: TagCreateOrConnectWithoutPostTagInput
    connect?: TagWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutPostTagNestedInput = {
    create?: XOR<PostCreateWithoutPostTagInput, PostUncheckedCreateWithoutPostTagInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostTagInput
    upsert?: PostUpsertWithoutPostTagInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutPostTagInput, PostUpdateWithoutPostTagInput>, PostUncheckedUpdateWithoutPostTagInput>
  }

  export type TagUpdateOneRequiredWithoutPostTagNestedInput = {
    create?: XOR<TagCreateWithoutPostTagInput, TagUncheckedCreateWithoutPostTagInput>
    connectOrCreate?: TagCreateOrConnectWithoutPostTagInput
    upsert?: TagUpsertWithoutPostTagInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutPostTagInput, TagUpdateWithoutPostTagInput>, TagUncheckedUpdateWithoutPostTagInput>
  }

  export type FileCreateNestedOneWithoutProjectInput = {
    create?: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput>
    connectOrCreate?: FileCreateOrConnectWithoutProjectInput
    connect?: FileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProjectAuthorInput = {
    create?: XOR<UserCreateWithoutProjectAuthorInput, UserUncheckedCreateWithoutProjectAuthorInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectAuthorInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProjectUpdaterInput = {
    create?: XOR<UserCreateWithoutProjectUpdaterInput, UserUncheckedCreateWithoutProjectUpdaterInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectUpdaterInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectTagCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type ProjectTagUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
  }

  export type FileUpdateOneWithoutProjectNestedInput = {
    create?: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput>
    connectOrCreate?: FileCreateOrConnectWithoutProjectInput
    upsert?: FileUpsertWithoutProjectInput
    disconnect?: FileWhereInput | boolean
    delete?: FileWhereInput | boolean
    connect?: FileWhereUniqueInput
    update?: XOR<XOR<FileUpdateToOneWithWhereWithoutProjectInput, FileUpdateWithoutProjectInput>, FileUncheckedUpdateWithoutProjectInput>
  }

  export type UserUpdateOneRequiredWithoutProjectAuthorNestedInput = {
    create?: XOR<UserCreateWithoutProjectAuthorInput, UserUncheckedCreateWithoutProjectAuthorInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectAuthorInput
    upsert?: UserUpsertWithoutProjectAuthorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectAuthorInput, UserUpdateWithoutProjectAuthorInput>, UserUncheckedUpdateWithoutProjectAuthorInput>
  }

  export type UserUpdateOneWithoutProjectUpdaterNestedInput = {
    create?: XOR<UserCreateWithoutProjectUpdaterInput, UserUncheckedCreateWithoutProjectUpdaterInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectUpdaterInput
    upsert?: UserUpsertWithoutProjectUpdaterInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectUpdaterInput, UserUpdateWithoutProjectUpdaterInput>, UserUncheckedUpdateWithoutProjectUpdaterInput>
  }

  export type ProjectTagUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutProjectInput | ProjectTagUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutProjectInput | ProjectTagUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutProjectInput | ProjectTagUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type ProjectTagUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput> | ProjectTagCreateWithoutProjectInput[] | ProjectTagUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectTagCreateOrConnectWithoutProjectInput | ProjectTagCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectTagUpsertWithWhereUniqueWithoutProjectInput | ProjectTagUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectTagCreateManyProjectInputEnvelope
    set?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    disconnect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    delete?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    connect?: ProjectTagWhereUniqueInput | ProjectTagWhereUniqueInput[]
    update?: ProjectTagUpdateWithWhereUniqueWithoutProjectInput | ProjectTagUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectTagUpdateManyWithWhereWithoutProjectInput | ProjectTagUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutProjectTagInput = {
    create?: XOR<ProjectCreateWithoutProjectTagInput, ProjectUncheckedCreateWithoutProjectTagInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectTagInput
    connect?: ProjectWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutProjectTagInput = {
    create?: XOR<TagCreateWithoutProjectTagInput, TagUncheckedCreateWithoutProjectTagInput>
    connectOrCreate?: TagCreateOrConnectWithoutProjectTagInput
    connect?: TagWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutProjectTagNestedInput = {
    create?: XOR<ProjectCreateWithoutProjectTagInput, ProjectUncheckedCreateWithoutProjectTagInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutProjectTagInput
    upsert?: ProjectUpsertWithoutProjectTagInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutProjectTagInput, ProjectUpdateWithoutProjectTagInput>, ProjectUncheckedUpdateWithoutProjectTagInput>
  }

  export type TagUpdateOneRequiredWithoutProjectTagNestedInput = {
    create?: XOR<TagCreateWithoutProjectTagInput, TagUncheckedCreateWithoutProjectTagInput>
    connectOrCreate?: TagCreateOrConnectWithoutProjectTagInput
    upsert?: TagUpsertWithoutProjectTagInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutProjectTagInput, TagUpdateWithoutProjectTagInput>, TagUncheckedUpdateWithoutProjectTagInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumFileTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[]
    notIn?: $Enums.FileType[]
    not?: NestedEnumFileTypeFilter<$PrismaModel> | $Enums.FileType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumFileTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FileType | EnumFileTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FileType[]
    notIn?: $Enums.FileType[]
    not?: NestedEnumFileTypeWithAggregatesFilter<$PrismaModel> | $Enums.FileType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFileTypeFilter<$PrismaModel>
    _max?: NestedEnumFileTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserCreateWithoutFileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutFileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutFileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFileInput, UserUncheckedCreateWithoutFileInput>
  }

  export type UserCreateWithoutFileUInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutFileUInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutFileUInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFileUInput, UserUncheckedCreateWithoutFileUInput>
  }

  export type UserCreateWithoutAvatarFileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutAvatarFileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutAvatarFileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvatarFileInput, UserUncheckedCreateWithoutAvatarFileInput>
  }

  export type UserCreateManyAvatarFileInputEnvelope = {
    data: UserCreateManyAvatarFileInput | UserCreateManyAvatarFileInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutCoverImageInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    author: UserCreateNestedOneWithoutPostAuthorInput
    updatedBy?: UserCreateNestedOneWithoutPostUpdaterInput
    PostTag?: PostTagCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCoverImageInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    authorId: string
    updatedById?: string | null
    PostTag?: PostTagUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCoverImageInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCoverImageInput, PostUncheckedCreateWithoutCoverImageInput>
  }

  export type PostCreateManyCoverImageInputEnvelope = {
    data: PostCreateManyCoverImageInput | PostCreateManyCoverImageInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutCoverImageInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    author: UserCreateNestedOneWithoutProjectAuthorInput
    updatedBy?: UserCreateNestedOneWithoutProjectUpdaterInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutCoverImageInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutCoverImageInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutCoverImageInput, ProjectUncheckedCreateWithoutCoverImageInput>
  }

  export type ProjectCreateManyCoverImageInputEnvelope = {
    data: ProjectCreateManyCoverImageInput | ProjectCreateManyCoverImageInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFileInput = {
    update: XOR<UserUpdateWithoutFileInput, UserUncheckedUpdateWithoutFileInput>
    create: XOR<UserCreateWithoutFileInput, UserUncheckedCreateWithoutFileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFileInput, UserUncheckedUpdateWithoutFileInput>
  }

  export type UserUpdateWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutFileUInput = {
    update: XOR<UserUpdateWithoutFileUInput, UserUncheckedUpdateWithoutFileUInput>
    create: XOR<UserCreateWithoutFileUInput, UserUncheckedCreateWithoutFileUInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFileUInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFileUInput, UserUncheckedUpdateWithoutFileUInput>
  }

  export type UserUpdateWithoutFileUInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFileUInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutAvatarFileInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAvatarFileInput, UserUncheckedUpdateWithoutAvatarFileInput>
    create: XOR<UserCreateWithoutAvatarFileInput, UserUncheckedCreateWithoutAvatarFileInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAvatarFileInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAvatarFileInput, UserUncheckedUpdateWithoutAvatarFileInput>
  }

  export type UserUpdateManyWithWhereWithoutAvatarFileInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAvatarFileInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    registeredDate?: DateTimeFilter<"User"> | Date | string
    lastLoginDate?: DateTimeNullableFilter<"User"> | Date | string | null
    refreshToken?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    bio?: StringNullableFilter<"User"> | string | null
    avatarFileId?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    updatedById?: StringNullableFilter<"User"> | string | null
    dateUpdated?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type PostUpsertWithWhereUniqueWithoutCoverImageInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutCoverImageInput, PostUncheckedUpdateWithoutCoverImageInput>
    create: XOR<PostCreateWithoutCoverImageInput, PostUncheckedCreateWithoutCoverImageInput>
  }

  export type PostUpdateWithWhereUniqueWithoutCoverImageInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutCoverImageInput, PostUncheckedUpdateWithoutCoverImageInput>
  }

  export type PostUpdateManyWithWhereWithoutCoverImageInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutCoverImageInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    excerpt?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    isPublished?: BoolFilter<"Post"> | boolean
    isFeatured?: BoolFilter<"Post"> | boolean
    isActive?: BoolFilter<"Post"> | boolean
    publishDate?: DateTimeNullableFilter<"Post"> | Date | string | null
    createdDate?: DateTimeFilter<"Post"> | Date | string
    updatedDate?: DateTimeNullableFilter<"Post"> | Date | string | null
    coverImageId?: StringNullableFilter<"Post"> | string | null
    authorId?: StringFilter<"Post"> | string
    updatedById?: StringNullableFilter<"Post"> | string | null
  }

  export type ProjectUpsertWithWhereUniqueWithoutCoverImageInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutCoverImageInput, ProjectUncheckedUpdateWithoutCoverImageInput>
    create: XOR<ProjectCreateWithoutCoverImageInput, ProjectUncheckedCreateWithoutCoverImageInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutCoverImageInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutCoverImageInput, ProjectUncheckedUpdateWithoutCoverImageInput>
  }

  export type ProjectUpdateManyWithWhereWithoutCoverImageInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutCoverImageInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    title?: StringFilter<"Project"> | string
    slug?: StringFilter<"Project"> | string
    description?: StringFilter<"Project"> | string
    content?: StringFilter<"Project"> | string
    coverImageId?: StringNullableFilter<"Project"> | string | null
    isPublished?: BoolFilter<"Project"> | boolean
    isFeatured?: BoolFilter<"Project"> | boolean
    publishDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    createdDate?: DateTimeFilter<"Project"> | Date | string
    updatedDate?: DateTimeNullableFilter<"Project"> | Date | string | null
    isActive?: BoolFilter<"Project"> | boolean
    authorId?: StringFilter<"Project"> | string
    codeUrl?: StringNullableFilter<"Project"> | string | null
    liveUrl?: StringNullableFilter<"Project"> | string | null
    updatedById?: StringNullableFilter<"Project"> | string | null
  }

  export type FileCreateWithoutUserInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    uploader: UserCreateNestedOneWithoutFileInput
    updatedBy?: UserCreateNestedOneWithoutFileUInput
    Post?: PostCreateNestedManyWithoutCoverImageInput
    Project?: ProjectCreateNestedManyWithoutCoverImageInput
  }

  export type FileUncheckedCreateWithoutUserInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
    userId: string
    Post?: PostUncheckedCreateNestedManyWithoutCoverImageInput
    Project?: ProjectUncheckedCreateNestedManyWithoutCoverImageInput
  }

  export type FileCreateOrConnectWithoutUserInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type UserCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutUserInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutUserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserInput, UserUncheckedCreateWithoutUserInput>
  }

  export type PostCreateWithoutAuthorInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImage?: FileCreateNestedOneWithoutPostInput
    updatedBy?: UserCreateNestedOneWithoutPostUpdaterInput
    PostTag?: PostTagCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    updatedById?: string | null
    PostTag?: PostTagUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: PostCreateManyAuthorInput | PostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutAuthorInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    coverImage?: FileCreateNestedOneWithoutProjectInput
    updatedBy?: UserCreateNestedOneWithoutProjectUpdaterInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAuthorInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput>
  }

  export type ProjectCreateManyAuthorInputEnvelope = {
    data: ProjectCreateManyAuthorInput | ProjectCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutUploaderInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedBy?: UserCreateNestedOneWithoutFileUInput
    User?: UserCreateNestedManyWithoutAvatarFileInput
    Post?: PostCreateNestedManyWithoutCoverImageInput
    Project?: ProjectCreateNestedManyWithoutCoverImageInput
  }

  export type FileUncheckedCreateWithoutUploaderInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
    User?: UserUncheckedCreateNestedManyWithoutAvatarFileInput
    Post?: PostUncheckedCreateNestedManyWithoutCoverImageInput
    Project?: ProjectUncheckedCreateNestedManyWithoutCoverImageInput
  }

  export type FileCreateOrConnectWithoutUploaderInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput>
  }

  export type FileCreateManyUploaderInputEnvelope = {
    data: FileCreateManyUploaderInput | FileCreateManyUploaderInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutUpdatedByInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImage?: FileCreateNestedOneWithoutPostInput
    author: UserCreateNestedOneWithoutPostAuthorInput
    PostTag?: PostTagCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    authorId: string
    PostTag?: PostTagUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutUpdatedByInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUpdatedByInput, PostUncheckedCreateWithoutUpdatedByInput>
  }

  export type PostCreateManyUpdatedByInputEnvelope = {
    data: PostCreateManyUpdatedByInput | PostCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutUpdatedByInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    coverImage?: FileCreateNestedOneWithoutProjectInput
    author: UserCreateNestedOneWithoutProjectAuthorInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUpdatedByInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUpdatedByInput, ProjectUncheckedCreateWithoutUpdatedByInput>
  }

  export type ProjectCreateManyUpdatedByInputEnvelope = {
    data: ProjectCreateManyUpdatedByInput | ProjectCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type TagCreateWithoutAuthorInput = {
    id?: string
    name: string
    isActive?: boolean
    PostTag?: PostTagCreateNestedManyWithoutTagInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutAuthorInput = {
    id?: string
    name: string
    isActive?: boolean
    PostTag?: PostTagUncheckedCreateNestedManyWithoutTagInput
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutAuthorInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutAuthorInput, TagUncheckedCreateWithoutAuthorInput>
  }

  export type TagCreateManyAuthorInputEnvelope = {
    data: TagCreateManyAuthorInput | TagCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutUpdatedByInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    uploader: UserCreateNestedOneWithoutFileInput
    User?: UserCreateNestedManyWithoutAvatarFileInput
    Post?: PostCreateNestedManyWithoutCoverImageInput
    Project?: ProjectCreateNestedManyWithoutCoverImageInput
  }

  export type FileUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    userId: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarFileInput
    Post?: PostUncheckedCreateNestedManyWithoutCoverImageInput
    Project?: ProjectUncheckedCreateNestedManyWithoutCoverImageInput
  }

  export type FileCreateOrConnectWithoutUpdatedByInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUpdatedByInput, FileUncheckedCreateWithoutUpdatedByInput>
  }

  export type FileCreateManyUpdatedByInputEnvelope = {
    data: FileCreateManyUpdatedByInput | FileCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutUpdatedByInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutUpdatedByInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutUpdatedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUpdatedByInput, UserUncheckedCreateWithoutUpdatedByInput>
  }

  export type UserCreateManyUpdatedByInputEnvelope = {
    data: UserCreateManyUpdatedByInput | UserCreateManyUpdatedByInput[]
    skipDuplicates?: boolean
  }

  export type FileUpsertWithoutUserInput = {
    update: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
    where?: FileWhereInput
  }

  export type FileUpdateToOneWithWhereWithoutUserInput = {
    where?: FileWhereInput
    data: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
  }

  export type FileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploader?: UserUpdateOneRequiredWithoutFileNestedInput
    updatedBy?: UserUpdateOneWithoutFileUNestedInput
    Post?: PostUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    Post?: PostUncheckedUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutCoverImageNestedInput
  }

  export type UserUpsertWithoutUserInput = {
    update: XOR<UserUpdateWithoutUserInput, UserUncheckedUpdateWithoutUserInput>
    create: XOR<UserCreateWithoutUserInput, UserUncheckedCreateWithoutUserInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserInput, UserUncheckedUpdateWithoutUserInput>
  }

  export type UserUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutAuthorInput, ProjectUncheckedUpdateWithoutAuthorInput>
    create: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutAuthorInput, ProjectUncheckedUpdateWithoutAuthorInput>
  }

  export type ProjectUpdateManyWithWhereWithoutAuthorInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutAuthorInput>
  }

  export type FileUpsertWithWhereUniqueWithoutUploaderInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutUploaderInput, FileUncheckedUpdateWithoutUploaderInput>
    create: XOR<FileCreateWithoutUploaderInput, FileUncheckedCreateWithoutUploaderInput>
  }

  export type FileUpdateWithWhereUniqueWithoutUploaderInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutUploaderInput, FileUncheckedUpdateWithoutUploaderInput>
  }

  export type FileUpdateManyWithWhereWithoutUploaderInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutUploaderInput>
  }

  export type FileScalarWhereInput = {
    AND?: FileScalarWhereInput | FileScalarWhereInput[]
    OR?: FileScalarWhereInput[]
    NOT?: FileScalarWhereInput | FileScalarWhereInput[]
    id?: StringFilter<"File"> | string
    originalName?: StringFilter<"File"> | string
    size?: IntFilter<"File"> | number
    url?: StringFilter<"File"> | string
    objectKey?: StringFilter<"File"> | string
    fileType?: EnumFileTypeFilter<"File"> | $Enums.FileType
    dateUploaded?: DateTimeFilter<"File"> | Date | string
    dateUpdated?: DateTimeNullableFilter<"File"> | Date | string | null
    isActive?: BoolFilter<"File"> | boolean
    updatedById?: StringNullableFilter<"File"> | string | null
    userId?: StringFilter<"File"> | string
  }

  export type PostUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUpdatedByInput, PostUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<PostCreateWithoutUpdatedByInput, PostUncheckedCreateWithoutUpdatedByInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUpdatedByInput, PostUncheckedUpdateWithoutUpdatedByInput>
  }

  export type PostUpdateManyWithWhereWithoutUpdatedByInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type ProjectUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUpdatedByInput, ProjectUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<ProjectCreateWithoutUpdatedByInput, ProjectUncheckedCreateWithoutUpdatedByInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUpdatedByInput, ProjectUncheckedUpdateWithoutUpdatedByInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUpdatedByInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type TagUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutAuthorInput, TagUncheckedUpdateWithoutAuthorInput>
    create: XOR<TagCreateWithoutAuthorInput, TagUncheckedCreateWithoutAuthorInput>
  }

  export type TagUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutAuthorInput, TagUncheckedUpdateWithoutAuthorInput>
  }

  export type TagUpdateManyWithWhereWithoutAuthorInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutAuthorInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    authorId?: StringFilter<"Tag"> | string
    isActive?: BoolFilter<"Tag"> | boolean
  }

  export type FileUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutUpdatedByInput, FileUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<FileCreateWithoutUpdatedByInput, FileUncheckedCreateWithoutUpdatedByInput>
  }

  export type FileUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutUpdatedByInput, FileUncheckedUpdateWithoutUpdatedByInput>
  }

  export type FileUpdateManyWithWhereWithoutUpdatedByInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type UserUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutUpdatedByInput, UserUncheckedUpdateWithoutUpdatedByInput>
    create: XOR<UserCreateWithoutUpdatedByInput, UserUncheckedCreateWithoutUpdatedByInput>
  }

  export type UserUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutUpdatedByInput, UserUncheckedUpdateWithoutUpdatedByInput>
  }

  export type UserUpdateManyWithWhereWithoutUpdatedByInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUpdatedByInput>
  }

  export type UserCreateWithoutTagInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutTagInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutTagInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTagInput, UserUncheckedCreateWithoutTagInput>
  }

  export type PostTagCreateWithoutTagInput = {
    post: PostCreateNestedOneWithoutPostTagInput
  }

  export type PostTagUncheckedCreateWithoutTagInput = {
    postId: string
  }

  export type PostTagCreateOrConnectWithoutTagInput = {
    where: PostTagWhereUniqueInput
    create: XOR<PostTagCreateWithoutTagInput, PostTagUncheckedCreateWithoutTagInput>
  }

  export type PostTagCreateManyTagInputEnvelope = {
    data: PostTagCreateManyTagInput | PostTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type ProjectTagCreateWithoutTagInput = {
    project: ProjectCreateNestedOneWithoutProjectTagInput
  }

  export type ProjectTagUncheckedCreateWithoutTagInput = {
    projectId: string
  }

  export type ProjectTagCreateOrConnectWithoutTagInput = {
    where: ProjectTagWhereUniqueInput
    create: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput>
  }

  export type ProjectTagCreateManyTagInputEnvelope = {
    data: ProjectTagCreateManyTagInput | ProjectTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTagInput = {
    update: XOR<UserUpdateWithoutTagInput, UserUncheckedUpdateWithoutTagInput>
    create: XOR<UserCreateWithoutTagInput, UserUncheckedCreateWithoutTagInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTagInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTagInput, UserUncheckedUpdateWithoutTagInput>
  }

  export type UserUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type PostTagUpsertWithWhereUniqueWithoutTagInput = {
    where: PostTagWhereUniqueInput
    update: XOR<PostTagUpdateWithoutTagInput, PostTagUncheckedUpdateWithoutTagInput>
    create: XOR<PostTagCreateWithoutTagInput, PostTagUncheckedCreateWithoutTagInput>
  }

  export type PostTagUpdateWithWhereUniqueWithoutTagInput = {
    where: PostTagWhereUniqueInput
    data: XOR<PostTagUpdateWithoutTagInput, PostTagUncheckedUpdateWithoutTagInput>
  }

  export type PostTagUpdateManyWithWhereWithoutTagInput = {
    where: PostTagScalarWhereInput
    data: XOR<PostTagUpdateManyMutationInput, PostTagUncheckedUpdateManyWithoutTagInput>
  }

  export type PostTagScalarWhereInput = {
    AND?: PostTagScalarWhereInput | PostTagScalarWhereInput[]
    OR?: PostTagScalarWhereInput[]
    NOT?: PostTagScalarWhereInput | PostTagScalarWhereInput[]
    postId?: StringFilter<"PostTag"> | string
    tagId?: StringFilter<"PostTag"> | string
  }

  export type ProjectTagUpsertWithWhereUniqueWithoutTagInput = {
    where: ProjectTagWhereUniqueInput
    update: XOR<ProjectTagUpdateWithoutTagInput, ProjectTagUncheckedUpdateWithoutTagInput>
    create: XOR<ProjectTagCreateWithoutTagInput, ProjectTagUncheckedCreateWithoutTagInput>
  }

  export type ProjectTagUpdateWithWhereUniqueWithoutTagInput = {
    where: ProjectTagWhereUniqueInput
    data: XOR<ProjectTagUpdateWithoutTagInput, ProjectTagUncheckedUpdateWithoutTagInput>
  }

  export type ProjectTagUpdateManyWithWhereWithoutTagInput = {
    where: ProjectTagScalarWhereInput
    data: XOR<ProjectTagUpdateManyMutationInput, ProjectTagUncheckedUpdateManyWithoutTagInput>
  }

  export type ProjectTagScalarWhereInput = {
    AND?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
    OR?: ProjectTagScalarWhereInput[]
    NOT?: ProjectTagScalarWhereInput | ProjectTagScalarWhereInput[]
    projectId?: StringFilter<"ProjectTag"> | string
    tagId?: StringFilter<"ProjectTag"> | string
  }

  export type FileCreateWithoutPostInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    uploader: UserCreateNestedOneWithoutFileInput
    updatedBy?: UserCreateNestedOneWithoutFileUInput
    User?: UserCreateNestedManyWithoutAvatarFileInput
    Project?: ProjectCreateNestedManyWithoutCoverImageInput
  }

  export type FileUncheckedCreateWithoutPostInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
    userId: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarFileInput
    Project?: ProjectUncheckedCreateNestedManyWithoutCoverImageInput
  }

  export type FileCreateOrConnectWithoutPostInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutPostInput, FileUncheckedCreateWithoutPostInput>
  }

  export type UserCreateWithoutPostAuthorInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutPostAuthorInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutPostAuthorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostAuthorInput, UserUncheckedCreateWithoutPostAuthorInput>
  }

  export type UserCreateWithoutPostUpdaterInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutPostUpdaterInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutPostUpdaterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostUpdaterInput, UserUncheckedCreateWithoutPostUpdaterInput>
  }

  export type PostTagCreateWithoutPostInput = {
    tag: TagCreateNestedOneWithoutPostTagInput
  }

  export type PostTagUncheckedCreateWithoutPostInput = {
    tagId: string
  }

  export type PostTagCreateOrConnectWithoutPostInput = {
    where: PostTagWhereUniqueInput
    create: XOR<PostTagCreateWithoutPostInput, PostTagUncheckedCreateWithoutPostInput>
  }

  export type PostTagCreateManyPostInputEnvelope = {
    data: PostTagCreateManyPostInput | PostTagCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type FileUpsertWithoutPostInput = {
    update: XOR<FileUpdateWithoutPostInput, FileUncheckedUpdateWithoutPostInput>
    create: XOR<FileCreateWithoutPostInput, FileUncheckedCreateWithoutPostInput>
    where?: FileWhereInput
  }

  export type FileUpdateToOneWithWhereWithoutPostInput = {
    where?: FileWhereInput
    data: XOR<FileUpdateWithoutPostInput, FileUncheckedUpdateWithoutPostInput>
  }

  export type FileUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploader?: UserUpdateOneRequiredWithoutFileNestedInput
    updatedBy?: UserUpdateOneWithoutFileUNestedInput
    User?: UserUpdateManyWithoutAvatarFileNestedInput
    Project?: ProjectUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarFileNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutCoverImageNestedInput
  }

  export type UserUpsertWithoutPostAuthorInput = {
    update: XOR<UserUpdateWithoutPostAuthorInput, UserUncheckedUpdateWithoutPostAuthorInput>
    create: XOR<UserCreateWithoutPostAuthorInput, UserUncheckedCreateWithoutPostAuthorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostAuthorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostAuthorInput, UserUncheckedUpdateWithoutPostAuthorInput>
  }

  export type UserUpdateWithoutPostAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutPostAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutPostUpdaterInput = {
    update: XOR<UserUpdateWithoutPostUpdaterInput, UserUncheckedUpdateWithoutPostUpdaterInput>
    create: XOR<UserCreateWithoutPostUpdaterInput, UserUncheckedCreateWithoutPostUpdaterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostUpdaterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostUpdaterInput, UserUncheckedUpdateWithoutPostUpdaterInput>
  }

  export type UserUpdateWithoutPostUpdaterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutPostUpdaterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type PostTagUpsertWithWhereUniqueWithoutPostInput = {
    where: PostTagWhereUniqueInput
    update: XOR<PostTagUpdateWithoutPostInput, PostTagUncheckedUpdateWithoutPostInput>
    create: XOR<PostTagCreateWithoutPostInput, PostTagUncheckedCreateWithoutPostInput>
  }

  export type PostTagUpdateWithWhereUniqueWithoutPostInput = {
    where: PostTagWhereUniqueInput
    data: XOR<PostTagUpdateWithoutPostInput, PostTagUncheckedUpdateWithoutPostInput>
  }

  export type PostTagUpdateManyWithWhereWithoutPostInput = {
    where: PostTagScalarWhereInput
    data: XOR<PostTagUpdateManyMutationInput, PostTagUncheckedUpdateManyWithoutPostInput>
  }

  export type PostCreateWithoutPostTagInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImage?: FileCreateNestedOneWithoutPostInput
    author: UserCreateNestedOneWithoutPostAuthorInput
    updatedBy?: UserCreateNestedOneWithoutPostUpdaterInput
  }

  export type PostUncheckedCreateWithoutPostTagInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    authorId: string
    updatedById?: string | null
  }

  export type PostCreateOrConnectWithoutPostTagInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutPostTagInput, PostUncheckedCreateWithoutPostTagInput>
  }

  export type TagCreateWithoutPostTagInput = {
    id?: string
    name: string
    isActive?: boolean
    author: UserCreateNestedOneWithoutTagInput
    ProjectTag?: ProjectTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutPostTagInput = {
    id?: string
    name: string
    authorId: string
    isActive?: boolean
    ProjectTag?: ProjectTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutPostTagInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutPostTagInput, TagUncheckedCreateWithoutPostTagInput>
  }

  export type PostUpsertWithoutPostTagInput = {
    update: XOR<PostUpdateWithoutPostTagInput, PostUncheckedUpdateWithoutPostTagInput>
    create: XOR<PostCreateWithoutPostTagInput, PostUncheckedCreateWithoutPostTagInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutPostTagInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutPostTagInput, PostUncheckedUpdateWithoutPostTagInput>
  }

  export type PostUpdateWithoutPostTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImage?: FileUpdateOneWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostAuthorNestedInput
    updatedBy?: UserUpdateOneWithoutPostUpdaterNestedInput
  }

  export type PostUncheckedUpdateWithoutPostTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpsertWithoutPostTagInput = {
    update: XOR<TagUpdateWithoutPostTagInput, TagUncheckedUpdateWithoutPostTagInput>
    create: XOR<TagCreateWithoutPostTagInput, TagUncheckedCreateWithoutPostTagInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutPostTagInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutPostTagInput, TagUncheckedUpdateWithoutPostTagInput>
  }

  export type TagUpdateWithoutPostTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutTagNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutPostTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type FileCreateWithoutProjectInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    uploader: UserCreateNestedOneWithoutFileInput
    updatedBy?: UserCreateNestedOneWithoutFileUInput
    User?: UserCreateNestedManyWithoutAvatarFileInput
    Post?: PostCreateNestedManyWithoutCoverImageInput
  }

  export type FileUncheckedCreateWithoutProjectInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
    userId: string
    User?: UserUncheckedCreateNestedManyWithoutAvatarFileInput
    Post?: PostUncheckedCreateNestedManyWithoutCoverImageInput
  }

  export type FileCreateOrConnectWithoutProjectInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput>
  }

  export type UserCreateWithoutProjectAuthorInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutProjectAuthorInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    ProjectUpdater?: ProjectUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutProjectAuthorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectAuthorInput, UserUncheckedCreateWithoutProjectAuthorInput>
  }

  export type UserCreateWithoutProjectUpdaterInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
    avatarFile?: FileCreateNestedOneWithoutUserInput
    updatedBy?: UserCreateNestedOneWithoutUserInput
    PostAuthor?: PostCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectCreateNestedManyWithoutAuthorInput
    File?: FileCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostCreateNestedManyWithoutUpdatedByInput
    Tag?: TagCreateNestedManyWithoutAuthorInput
    FileU?: FileCreateNestedManyWithoutUpdatedByInput
    User?: UserCreateNestedManyWithoutUpdatedByInput
  }

  export type UserUncheckedCreateWithoutProjectUpdaterInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
    PostAuthor?: PostUncheckedCreateNestedManyWithoutAuthorInput
    ProjectAuthor?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    File?: FileUncheckedCreateNestedManyWithoutUploaderInput
    PostUpdater?: PostUncheckedCreateNestedManyWithoutUpdatedByInput
    Tag?: TagUncheckedCreateNestedManyWithoutAuthorInput
    FileU?: FileUncheckedCreateNestedManyWithoutUpdatedByInput
    User?: UserUncheckedCreateNestedManyWithoutUpdatedByInput
  }

  export type UserCreateOrConnectWithoutProjectUpdaterInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectUpdaterInput, UserUncheckedCreateWithoutProjectUpdaterInput>
  }

  export type ProjectTagCreateWithoutProjectInput = {
    tag: TagCreateNestedOneWithoutProjectTagInput
  }

  export type ProjectTagUncheckedCreateWithoutProjectInput = {
    tagId: string
  }

  export type ProjectTagCreateOrConnectWithoutProjectInput = {
    where: ProjectTagWhereUniqueInput
    create: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput>
  }

  export type ProjectTagCreateManyProjectInputEnvelope = {
    data: ProjectTagCreateManyProjectInput | ProjectTagCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type FileUpsertWithoutProjectInput = {
    update: XOR<FileUpdateWithoutProjectInput, FileUncheckedUpdateWithoutProjectInput>
    create: XOR<FileCreateWithoutProjectInput, FileUncheckedCreateWithoutProjectInput>
    where?: FileWhereInput
  }

  export type FileUpdateToOneWithWhereWithoutProjectInput = {
    where?: FileWhereInput
    data: XOR<FileUpdateWithoutProjectInput, FileUncheckedUpdateWithoutProjectInput>
  }

  export type FileUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploader?: UserUpdateOneRequiredWithoutFileNestedInput
    updatedBy?: UserUpdateOneWithoutFileUNestedInput
    User?: UserUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUncheckedUpdateManyWithoutCoverImageNestedInput
  }

  export type UserUpsertWithoutProjectAuthorInput = {
    update: XOR<UserUpdateWithoutProjectAuthorInput, UserUncheckedUpdateWithoutProjectAuthorInput>
    create: XOR<UserCreateWithoutProjectAuthorInput, UserUncheckedCreateWithoutProjectAuthorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectAuthorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectAuthorInput, UserUncheckedUpdateWithoutProjectAuthorInput>
  }

  export type UserUpdateWithoutProjectAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUpsertWithoutProjectUpdaterInput = {
    update: XOR<UserUpdateWithoutProjectUpdaterInput, UserUncheckedUpdateWithoutProjectUpdaterInput>
    create: XOR<UserCreateWithoutProjectUpdaterInput, UserUncheckedCreateWithoutProjectUpdaterInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectUpdaterInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectUpdaterInput, UserUncheckedUpdateWithoutProjectUpdaterInput>
  }

  export type UserUpdateWithoutProjectUpdaterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectUpdaterInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type ProjectTagUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectTagWhereUniqueInput
    update: XOR<ProjectTagUpdateWithoutProjectInput, ProjectTagUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectTagCreateWithoutProjectInput, ProjectTagUncheckedCreateWithoutProjectInput>
  }

  export type ProjectTagUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectTagWhereUniqueInput
    data: XOR<ProjectTagUpdateWithoutProjectInput, ProjectTagUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectTagUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectTagScalarWhereInput
    data: XOR<ProjectTagUpdateManyMutationInput, ProjectTagUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutProjectTagInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    coverImage?: FileCreateNestedOneWithoutProjectInput
    author: UserCreateNestedOneWithoutProjectAuthorInput
    updatedBy?: UserCreateNestedOneWithoutProjectUpdaterInput
  }

  export type ProjectUncheckedCreateWithoutProjectTagInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
  }

  export type ProjectCreateOrConnectWithoutProjectTagInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutProjectTagInput, ProjectUncheckedCreateWithoutProjectTagInput>
  }

  export type TagCreateWithoutProjectTagInput = {
    id?: string
    name: string
    isActive?: boolean
    author: UserCreateNestedOneWithoutTagInput
    PostTag?: PostTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutProjectTagInput = {
    id?: string
    name: string
    authorId: string
    isActive?: boolean
    PostTag?: PostTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutProjectTagInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutProjectTagInput, TagUncheckedCreateWithoutProjectTagInput>
  }

  export type ProjectUpsertWithoutProjectTagInput = {
    update: XOR<ProjectUpdateWithoutProjectTagInput, ProjectUncheckedUpdateWithoutProjectTagInput>
    create: XOR<ProjectCreateWithoutProjectTagInput, ProjectUncheckedCreateWithoutProjectTagInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutProjectTagInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutProjectTagInput, ProjectUncheckedUpdateWithoutProjectTagInput>
  }

  export type ProjectUpdateWithoutProjectTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: FileUpdateOneWithoutProjectNestedInput
    author?: UserUpdateOneRequiredWithoutProjectAuthorNestedInput
    updatedBy?: UserUpdateOneWithoutProjectUpdaterNestedInput
  }

  export type ProjectUncheckedUpdateWithoutProjectTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpsertWithoutProjectTagInput = {
    update: XOR<TagUpdateWithoutProjectTagInput, TagUncheckedUpdateWithoutProjectTagInput>
    create: XOR<TagCreateWithoutProjectTagInput, TagUncheckedCreateWithoutProjectTagInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutProjectTagInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutProjectTagInput, TagUncheckedUpdateWithoutProjectTagInput>
  }

  export type TagUpdateWithoutProjectTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutTagNestedInput
    PostTag?: PostTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutProjectTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    PostTag?: PostTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type UserCreateManyAvatarFileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    isActive?: boolean
    updatedById?: string | null
    dateUpdated?: Date | string | null
  }

  export type PostCreateManyCoverImageInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    authorId: string
    updatedById?: string | null
  }

  export type ProjectCreateManyCoverImageInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
  }

  export type UserUpdateWithoutAvatarFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedBy?: UserUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAvatarFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAvatarFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostUpdateWithoutCoverImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutPostAuthorNestedInput
    updatedBy?: UserUpdateOneWithoutPostUpdaterNestedInput
    PostTag?: PostTagUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutCoverImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    PostTag?: PostTagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutCoverImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUpdateWithoutCoverImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    author?: UserUpdateOneRequiredWithoutProjectAuthorNestedInput
    updatedBy?: UserUpdateOneWithoutProjectUpdaterNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutCoverImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutCoverImageInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostCreateManyAuthorInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    updatedById?: string | null
  }

  export type ProjectCreateManyAuthorInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    codeUrl?: string | null
    liveUrl?: string | null
    updatedById?: string | null
  }

  export type FileCreateManyUploaderInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    updatedById?: string | null
  }

  export type PostCreateManyUpdatedByInput = {
    id?: string
    title: string
    slug: string
    excerpt: string
    content: string
    isPublished?: boolean
    isFeatured?: boolean
    isActive?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    coverImageId?: string | null
    authorId: string
  }

  export type ProjectCreateManyUpdatedByInput = {
    id?: string
    title: string
    slug: string
    description: string
    content: string
    coverImageId?: string | null
    isPublished?: boolean
    isFeatured?: boolean
    publishDate?: Date | string | null
    createdDate?: Date | string
    updatedDate?: Date | string | null
    isActive?: boolean
    authorId: string
    codeUrl?: string | null
    liveUrl?: string | null
  }

  export type TagCreateManyAuthorInput = {
    id?: string
    name: string
    isActive?: boolean
  }

  export type FileCreateManyUpdatedByInput = {
    id?: string
    originalName: string
    size: number
    url: string
    objectKey: string
    fileType?: $Enums.FileType
    dateUploaded?: Date | string
    dateUpdated?: Date | string | null
    isActive?: boolean
    userId: string
  }

  export type UserCreateManyUpdatedByInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    passwordHash: string
    registeredDate?: Date | string
    lastLoginDate?: Date | string | null
    refreshToken?: string | null
    role?: $Enums.Role
    bio?: string | null
    avatarFileId?: string | null
    isActive?: boolean
    dateUpdated?: Date | string | null
  }

  export type PostUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImage?: FileUpdateOneWithoutPostNestedInput
    updatedBy?: UserUpdateOneWithoutPostUpdaterNestedInput
    PostTag?: PostTagUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    PostTag?: PostTagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: FileUpdateOneWithoutProjectNestedInput
    updatedBy?: UserUpdateOneWithoutProjectUpdaterNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FileUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedBy?: UserUpdateOneWithoutFileUNestedInput
    User?: UserUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
    User?: UserUncheckedUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUncheckedUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateManyWithoutUploaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PostUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImage?: FileUpdateOneWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostAuthorNestedInput
    PostTag?: PostTagUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    PostTag?: PostTagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: FileUpdateOneWithoutProjectNestedInput
    author?: UserUpdateOneRequiredWithoutProjectAuthorNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImageId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublished?: BoolFieldUpdateOperationsInput | boolean
    isFeatured?: BoolFieldUpdateOperationsInput | boolean
    publishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdDate?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    codeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    liveUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TagUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    PostTag?: PostTagUpdateManyWithoutTagNestedInput
    ProjectTag?: ProjectTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    PostTag?: PostTagUncheckedUpdateManyWithoutTagNestedInput
    ProjectTag?: ProjectTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FileUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    uploader?: UserUpdateOneRequiredWithoutFileNestedInput
    User?: UserUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutAvatarFileNestedInput
    Post?: PostUncheckedUpdateManyWithoutCoverImageNestedInput
    Project?: ProjectUncheckedUpdateManyWithoutCoverImageNestedInput
  }

  export type FileUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    url?: StringFieldUpdateOperationsInput | string
    objectKey?: StringFieldUpdateOperationsInput | string
    fileType?: EnumFileTypeFieldUpdateOperationsInput | $Enums.FileType
    dateUploaded?: DateTimeFieldUpdateOperationsInput | Date | string
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    avatarFile?: FileUpdateOneWithoutUserNestedInput
    PostAuthor?: PostUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUpdateManyWithoutAuthorNestedInput
    File?: FileUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUpdateManyWithoutAuthorNestedInput
    FileU?: FileUpdateManyWithoutUpdatedByNestedInput
    User?: UserUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    PostAuthor?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    ProjectAuthor?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    File?: FileUncheckedUpdateManyWithoutUploaderNestedInput
    PostUpdater?: PostUncheckedUpdateManyWithoutUpdatedByNestedInput
    ProjectUpdater?: ProjectUncheckedUpdateManyWithoutUpdatedByNestedInput
    Tag?: TagUncheckedUpdateManyWithoutAuthorNestedInput
    FileU?: FileUncheckedUpdateManyWithoutUpdatedByNestedInput
    User?: UserUncheckedUpdateManyWithoutUpdatedByNestedInput
  }

  export type UserUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    registeredDate?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatarFileId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostTagCreateManyTagInput = {
    postId: string
  }

  export type ProjectTagCreateManyTagInput = {
    projectId: string
  }

  export type PostTagUpdateWithoutTagInput = {
    post?: PostUpdateOneRequiredWithoutPostTagNestedInput
  }

  export type PostTagUncheckedUpdateWithoutTagInput = {
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type PostTagUncheckedUpdateManyWithoutTagInput = {
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUpdateWithoutTagInput = {
    project?: ProjectUpdateOneRequiredWithoutProjectTagNestedInput
  }

  export type ProjectTagUncheckedUpdateWithoutTagInput = {
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUncheckedUpdateManyWithoutTagInput = {
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type PostTagCreateManyPostInput = {
    tagId: string
  }

  export type PostTagUpdateWithoutPostInput = {
    tag?: TagUpdateOneRequiredWithoutPostTagNestedInput
  }

  export type PostTagUncheckedUpdateWithoutPostInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type PostTagUncheckedUpdateManyWithoutPostInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagCreateManyProjectInput = {
    tagId: string
  }

  export type ProjectTagUpdateWithoutProjectInput = {
    tag?: TagUpdateOneRequiredWithoutProjectTagNestedInput
  }

  export type ProjectTagUncheckedUpdateWithoutProjectInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectTagUncheckedUpdateManyWithoutProjectInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}