import { Prisma, Role } from "./generated/prisma";

type User = {
  id: string;
  role: Role;
};
declare global {
  namespace Express {
    interface Request {
      user?: User; // or `user: User` if you always guarantee it’s there
    }
  }
}
