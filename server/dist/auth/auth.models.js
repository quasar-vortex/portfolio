"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserModel = exports.registerUserModel = exports.baseUseModel = void 0;
const zod_1 = __importDefault(require("zod"));
// 8–16 chars, at least one letter, one digit, one special character
const passwordMessage = "Password Legnth Must Be Between 8 and 16 Characters and Include One Letter, One Digit, and One Special Characters.";
const passwordRegex = /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
exports.baseUseModel = zod_1.default.object({
    email: zod_1.default.string().email(),
    firstName: zod_1.default.string().min(2).max(20),
    lastName: zod_1.default.string().min(2).max(20),
    password: zod_1.default.string().regex(passwordRegex, { message: passwordMessage }),
    confirmPassword: zod_1.default
        .string()
        .regex(passwordRegex, { message: passwordMessage }),
});
exports.registerUserModel = zod_1.default
    .object({
    body: exports.baseUseModel.pick({
        email: true,
        password: true,
        confirmPassword: true,
        firstName: true,
        lastName: true,
    }),
})
    .refine(({ body: { password, confirmPassword } }) => password === confirmPassword, {
    message: "Passwords Must Match",
});
exports.loginUserModel = zod_1.default.object({
    body: exports.baseUseModel.pick({ email: true, password: true }),
});
