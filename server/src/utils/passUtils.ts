import argon from "argon2";

export const hashPass = async (pass: string) => await argon.hash(pass);
export const verifyPass = async (hash: string, pass: string) =>
  await argon.verify(hash, pass);
