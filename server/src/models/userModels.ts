import z from "zod";

const selectUser = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  registeredAt: true,
  lastLoginAt: true,
};

export default {
  selectUser,
};
