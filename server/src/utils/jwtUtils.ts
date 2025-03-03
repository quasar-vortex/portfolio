import jwt from "jsonwebtoken";
import { jwtEnv } from "../env";
import HttpError from "../error";
const {
  JWT_ACCESS_EXPIRATION_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRATION_TIME,
  JWT_REFRESH_SECRET,
} = jwtEnv;
export type UserTokenTypes = "ACCESS" | "REFRESH";
export type SignUserTokenPayload = {
  id: string;
} & Record<string, string>;

const signUserToken = (type: UserTokenTypes, payload: SignUserTokenPayload) => {
  const secret = type == "ACCESS" ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
  const expiresIn =
    type == "ACCESS" ? JWT_ACCESS_EXPIRATION_TIME : JWT_REFRESH_EXPIRATION_TIME;
  //@ts-ignore - expiresin issue
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

const verifyUserToken = async (
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

export default {
  verifyUserToken,
  signUserToken,
};
