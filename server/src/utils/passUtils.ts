import argon from "argon2";

const hashPass = async (pass: string) => await argon.hash(pass);
const verifyPass = async (hash: string, pass: string) =>
  await argon.verify(hash, pass);

export default {
  hashPass,
  verifyPass,
};
