import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRATION_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRATION_TIME,
  JWT_REFRESH_SECRET,
} from "../env/jwtEnv";
import HttpError from "../error";

export type UserTokenTypes = "ACCESS" | "REFRESH";
export type SignUserTokenPayload = {
  id: string;
} & Record<string, string>;

export const signUserToken = (
  type: UserTokenTypes,
  payload: SignUserTokenPayload
) => {
  const token = jwt.sign(
    payload,
    type == "ACCESS" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
    {
      expiresIn:
        type == "ACCESS"
          ? JWT_ACCESS_EXPIRATION_TIME
          : JWT_REFRESH_EXPIRATION_TIME,
    }
  );
  return token;
};

export const verifyUserToken = async (
  type: UserTokenTypes,
  token: string
): Promise<SignUserTokenPayload> => {
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      type == "ACCESS" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET,
      (err, decoded) => {
        if (err) {
          rej(
            new HttpError({
              statusMessage: "NOT_AUTHORIZED",
              message: "Token Invalid",
            })
          );
        }
        res(decoded as SignUserTokenPayload);
      }
    );
  });
};
