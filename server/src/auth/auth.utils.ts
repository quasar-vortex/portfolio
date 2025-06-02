import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../env";
import { HttpError } from "../error";
import { Role } from "../generated/prisma";
type TokenType = "ACCESS" | "REFRESH";
type SignUserTokenPayload = {
  id: string;
  role: Role;
};
export const signUserToken = (
  type: TokenType,
  payload: SignUserTokenPayload
) => {
  return jwt.sign(
    payload,
    type === "ACCESS" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
    { expiresIn: JWT_ACCESS_SECRET ? "30m" : "7d" }
  );
};

export const verifyUserToken = (
  type: TokenType,
  payload: string
): Promise<SignUserTokenPayload> => {
  return new Promise((res, rej) => {
    jwt.verify(
      payload,
      type === "ACCESS" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
      (err, decoded) => {
        if (err)
          rej(
            new HttpError({
              status: "NOT_AUTHORIZED",
              message: "Invalid Token",
            })
          );
        res(decoded as SignUserTokenPayload);
      }
    );
  });
};
